export default function getGazeEndIndex({
  gazepoints,
  startIndex = 0,
}) {
  if (startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const startTime = gazepoints[startIndex].timestamp;
  let endIndex = parseInt(startIndex);

  for (i = startIndex + 1; i < gazepoints.length; i++) {
    if (gazepoints[i].timestamp - gazepoints[i - 1].timestamp > this.gazeGap) {
      break;
    }
    endIndex++;
  }

  // console.log('points length: ' + gazepoints.length + ' startIndex: ' + startIndex + ' endIndex: ' + endIndex);

  if ((gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp) < this.minGazeTime) {
    throw new Meteor.Error('minGazeTimeNotMet', null, { nextIndex: endIndex + 1 });
  }

  return endIndex;
}
