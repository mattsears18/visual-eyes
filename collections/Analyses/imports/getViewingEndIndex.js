export default function getViewingEndIndex({
  gazepoints,
  startIndex = 0,
}) {
  if(startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  let startTime = gazepoints[startIndex].timestamp;

  for(i = startIndex + 1; i < gazepoints.length; i++) {
    if((gazepoints[i].timestamp - gazepoints[i - 1].timestamp) > this.viewingGap) {
      break;
    }

    endIndex = i;
  }

  // console.log('points length: ' + gazepoints.length + ' startIndex: ' + startIndex + ' endIndex: ' + endIndex);

  if(!endIndex || ((gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp) < this.minViewingTime)) {
    throw new Meteor.Error('minViewingTimeNotMet', null, { nextIndex: endIndex + 1 });
  }

  return endIndex;
}
