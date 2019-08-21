export default function getVisitEndIndex({ gazepoints, startIndex = 0 }) {
  const _gazepoints = [...gazepoints];

  if (startIndex > _gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const initialStimulusId = _gazepoints[startIndex].stimulusId;

  if (initialStimulusId == null) {
    throw new Error('noStimulusId');
  }

  let endIndex;

  const initialStimulus = Stimuli.findOne({ _id: initialStimulusId });

  if (!initialStimulus) {
    throw new Error('noStimulusFound');
  }

  let lastIndexOnStimulus;

  for (let i = parseInt(startIndex, 10) + 1; i < _gazepoints.length; i += 1) {
    console.log(`i: ${i}`);

    if (_gazepoints[i].stimulusId !== initialStimulusId) {
      lastIndexOnStimulus = i - 1;
      console.log(
        `stimulus changed! timestamp: ${_gazepoints[lastIndexOnStimulus].timestamp}`,
      );

      if (this.type === 'iso15007') {
        break;
      }

      const newStimulus = Stimuli.findOne({ _id: _gazepoints[i].stimulusId });
      console.log(`previous: ${initialStimulus.name} new: ${newStimulus.name}`);
    } else {
      console.log('same stimulus!');
    }

    if (this.type !== 'iso15007') {
      // Do not check MGGD if type === iso15007
      // ISO 15007 has no concept of MGGD

      if (
        _gazepoints[i].timestamp - _gazepoints[i - 1].timestamp
        > this.maxVisitGapDuration
      ) {
        console.log('exceeded MGGD!');
        break;
      } else {
        console.log('did not exceed MGGD');
      }
    }

    endIndex = i;
  }

  console.log(`endIndex: ${endIndex}`);

  console.log(
    `indices: [${startIndex}:${endIndex}] startTime: ${
      _gazepoints[startIndex].timestamp
    } endTime: ${
      _gazepoints[endIndex].timestamp
    } potential visit duration: ${_gazepoints[endIndex].timestamp
      - _gazepoints[startIndex].timestamp}`,
  );
  console.log(`minVisitDuration: ${this.minVisitDuration}`);

  if (
    _gazepoints[endIndex].timestamp - _gazepoints[startIndex].timestamp
    < this.minVisitDuration
  ) {
    console.log('min visit duration not met');
    throw new Meteor.Error('minVisitDurationNotMet', null, {
      nextIndex: endIndex + 1,
    });
  }

  return endIndex;
}
