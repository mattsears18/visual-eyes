export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
  if (startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const { stimulusId } = gazepoints[startIndex];

  if (stimulusId == null) {
    throw new Error('noStimulusId');
  }

  console.log(stimulusId);

  let endIndex = parseInt(startIndex, 10);

  const stimulus = Stimuli.findOne({ _id: stimulusId });
  let lastIndexOnStimulus;

  if (this.getType() === 'custom') {
    for (i = startIndex + 1; i < gazepoints.length; i++) {
      if (gazepoints[i].stimulusId !== stimulusId) {
        lastIndexOnStimulus = i - 1;
        console.log(
          `stimulus changed! timestamp: ${gazepoints[lastIndexOnStimulus].timestamp}`,
        );

        const newStimulus = Stimuli.findOne({ _id: gazepoints[i].stimulusId });
        console.log(`previous: ${stimulus.name} new: ${newStimulus.name}`);
      }

      if (
        gazepoints[i].timestamp - gazepoints[i - 1].timestamp
        > this.maxGlanceGapDuration
      ) {
        break;
      }
      endIndex++;
    }
  } else {
    console.log('not custom type');
  }

  // console.log(
  //   `startTime: ${gazepoints[startIndex].timestamp} endTime: ${
  //     gazepoints[endIndex].timestamp
  //   } potential glance duration: ${gazepoints[endIndex].timestamp
  //     - gazepoints[startIndex].timestamp}`,
  // );
  // console.log(`minGlanceDuration: ${this.minGlanceDuration}`);

  if (
    gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp
    < this.minGlanceDuration
  ) {
    // console.log('min glance duration not met');
    throw new Meteor.Error('minGlanceDurationNotMet', null, {
      nextIndex: endIndex + 1,
    });
  }

  return endIndex;
}
