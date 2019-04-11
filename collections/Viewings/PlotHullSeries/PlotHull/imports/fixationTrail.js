export default function fixationTrail(length, index) {
  let trailStart = Math.max((this.endIndex + 1 - length), 0);
  let trailEnd = (this.endIndex + 1);
  let trail = this.viewing().gazepoints.slice(trailStart, trailEnd);
  if(typeof(index) != 'undefined') {
    return trail.map((point) => {
      return point[index];
    });
  } else {
    return trail;
  }
}
