export default function fixationTrail(length, which) {
  if(length < 0) throw new Error('invalidTrailLength');

  let trailStart = Math.max((this.endIndex + 1 - length), 0);
  let trailEnd = (this.endIndex + 1);
  let trail = this.viewing().gazepoints.slice(trailStart, trailEnd);
  if(typeof(which) != 'undefined') {
    return trail.map((point) => {
      return point[which];
    });
  } else {
    return trail;
  }
}
