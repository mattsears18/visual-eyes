export default function getPointTrail(opt) {
  opt = opt || {};
  let hull = this.getHull(opt);
  let pointTrailLength = typeof(opt.pointTrailLength) != 'undefined' ? opt.pointTrailLength : this.pointTrailLength;

  if(typeof(pointTrailLength) != 'number' || pointTrailLength < 0) {
    throw new Error('invalidPointTrailLength')
  }

  if(pointTrailLength == 0) { return [] }

  let pointsToHull = this.points.slice(0, hull.endIndex + 1);
  let pointTrail = pointsToHull.slice(-pointTrailLength);

  if(typeof(opt.which) != 'undefined') {
    return pointTrail.map(point => point[opt.which])
  } else {
    return pointTrail
  }
}
