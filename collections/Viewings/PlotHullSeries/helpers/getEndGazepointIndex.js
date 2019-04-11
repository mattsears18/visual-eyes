export default function getEndGazepointIndex(startIndex) {
  if(!(this.viewing() && this.viewing().gazepoints && this.viewing().gazepoints[startIndex])) {
    console.log('gazepoint not found!');
    console.log('startIndex: ' + startIndex);
    console.log('viewingId: ' + this.viewing()._id);
    return;
  }

  let startTime = this.viewing().gazepoints[startIndex].timestamp;
  let endIndex = startIndex;
  let duration = 0;

  while (duration < this.viewing().period) {
    endIndex++;
    if(this.viewing().gazepoints[endIndex]) {
      let endTime = this.viewing().gazepoints[endIndex].timestamp;
      duration = endTime - startTime;
    } else {
      break;
    }
  }
  return endIndex - 1;
}
