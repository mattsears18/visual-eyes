export default function getStartGazepointIndex(endIndex) {
  if(!this.viewing().gazepoints[endIndex]) { throw new Error('endIndexOutOfBounds') }

  let viewing = this.viewing();
  let gazepoints = viewing.gazepoints;
  let endTime = gazepoints[endIndex].timestamp;
  let startIndex = endIndex;
  let duration = 0;

  while (duration <= viewing.period) {
    startIndex--;
    if(gazepoints[startIndex]) {
      let startTime = gazepoints[startIndex].timestamp;
      duration = endTime - startTime;
    } else {
      break;
    }
  }
  return startIndex + 1;
}
