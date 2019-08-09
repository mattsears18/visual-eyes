import { start } from 'repl';

export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
  console.log(this.type);

  let endIndex;

  if (this.type === 'custom') {
    if (startIndex > gazepoints.length - 2) {
      throw new Error('startIndexTooHigh');
    }
    const startTime = gazepoints[startIndex].timestamp;
    let endIndex = parseInt(startIndex);
    console.log('balls');
    console.log(this.type);
    for (let i = startIndex + 1; i < gazepoints.length; i += 1) {
      if (
        gazepoints[i].timestamp - gazepoints[i - 1].timestamp
        > this.maxGlanceGapDuration
      ) {
        break;
      }
      endIndex++;
    }
    // console.log('points length: ' + gazepoints.length + ' startIndex: ' + startIndex + ' endIndex: ' + endIndex);
    if (
      gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp
      < this.minGlanceDuration
    ) {
      throw new Meteor.Error('minGlanceDurationNotMet', null, {
        nextIndex: endIndex + 1,
      });
    }
  } else if (this.type === 'iso15007') {
    // pick back up here
    console.log('iso15007');
    endIndex = Math.min(startIndex + 100, gazepoints.length + 2);
  }

  return endIndex;
}
