export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
  if (startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  let endIndex = parseInt(startIndex, 10);

  const { stimulusId } = gazepoints[startIndex];
  const stimulus = Stimuli.findOne({ _id: stimulusId });
  let lastIndexOnStimulus;

  for (i = startIndex + 1; i < gazepoints.length; i++) {
    if (gazepoints[i].stimulusId !== stimulusId) {
      lastIndexOnStimulus = i - 1;
      console.log(
        `stimulus changed! timestamp: ${gazepoints[lastIndexOnStimulus].timestamp}`,
      );

      const newStimulus = Stimuli.findOne({ _id: gazepoints[i].stimulusId });
      console.log(`previous: ${stimulus.name} new: ${newStimulus.name}`);

      if (this.getType() === 'custom') {
        console.log('allow stimulus change if it doesnt exceed the MGGD');
        const glanceGap = gazepoints[i].timestamp - gazepoints[lastIndexOnStimulus].timestamp;
        if (glanceGap > this.maxGlanceGapDuration) {
          console.log('glance gap exceeded!');
        }
        break;
      } else {
        console.log('no stimulus change allowed!');
        break;
      }
    }

    if (
      gazepoints[i].timestamp - gazepoints[i - 1].timestamp
      > this.maxGlanceGapDuration
    ) {
      break;
    }
    endIndex++;
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
