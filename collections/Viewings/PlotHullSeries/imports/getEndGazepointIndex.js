export default function getEndGazepointIndex(startIndex) {
  if(!this.viewing().gazepoints[startIndex]) { throw new Error('startIndexOutOfBounds') }

  let viewing = this.viewing();
  let gazepoints = viewing.gazepoints;
  let startTime = gazepoints[startIndex].timestamp;
  let endIndex = startIndex;
  let duration = 0;

  while (duration <= viewing.period) {
    endIndex++;
    if(gazepoints[endIndex]) {
      let endTime = gazepoints[endIndex].timestamp;
      duration = endTime - startTime;
    } else {
      break;
    }
  }
  return endIndex - 1;
}
