export default function getStartGazepointIndex(endIndex) {
  let endTime = this.viewing().gazepoints[endIndex].timestamp;
  let startIndex = endIndex;
  let duration = 0;

  while (duration < this.viewing().period) {
    startIndex--;
    if(this.viewing().gazepoints[startIndex]) {
      let startTime = this.viewing().gazepoints[startIndex].timestamp;
      duration = endTime - startTime;
    } else {
      break;
    }
  }
  return startIndex + 1;
}
