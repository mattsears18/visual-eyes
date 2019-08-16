export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
  if (startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const initialStimulusId = gazepoints[startIndex].stimulusId;

  if (initialStimulusId == null) {
    throw new Error('noStimulusId');
  }

  let endIndex;

  const initialStimulus = Stimuli.findOne({ _id: initialStimulusId });
  let lastIndexOnStimulus;

  if (this.getType() === 'custom') {
    // console.log('type: custom');

    for (let i = parseInt(startIndex, 10) + 1; i < gazepoints.length; i += 1) {
      // console.log(`i: ${i}`);

      if (gazepoints[i].stimulusId !== initialStimulusId) {
        lastIndexOnStimulus = i - 1;
        console.log(
          `stimulus changed! timestamp: ${gazepoints[lastIndexOnStimulus].timestamp}`,
        );

        const newStimulus = Stimuli.findOne({ _id: gazepoints[i].stimulusId });
        console.log(
          `previous: ${initialStimulus.name} new: ${newStimulus.name}`,
        );
      } else {
        // console.log('same stimulus!');
      }

      if (
        gazepoints[i].timestamp - gazepoints[i - 1].timestamp
        > this.maxGlanceGapDuration
      ) {
        // console.log('exceeded MGGD!');
        break;
      } else {
        // console.log('did not exceed MGGD');
      }
      endIndex = i;
    }

    // console.log(`endIndex: ${endIndex}`);
  } else {
    // console.log('not custom type');
  }

  console.log(
    `indices: [${startIndex}:${endIndex}] startTime: ${
      gazepoints[startIndex].timestamp
    } endTime: ${
      gazepoints[endIndex].timestamp
    } potential glance duration: ${gazepoints[endIndex].timestamp
      - gazepoints[startIndex].timestamp}`,
  );
  console.log(`minGlanceDuration: ${this.minGlanceDuration}`);

  if (
    gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp
    < this.minGlanceDuration
  ) {
    console.log('min glance duration not met');
    throw new Meteor.Error('minGlanceDurationNotMet', null, {
      nextIndex: endIndex + 1,
    });
  }

  return endIndex;
}
