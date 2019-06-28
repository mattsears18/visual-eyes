export default function getPointTrail(opt) {
  opt = opt || {};
  const hull = this.getHull(opt);
  const pointTrailLength = typeof (opt.pointTrailLength) !== 'undefined' ? opt.pointTrailLength : this.pointTrailLength;

  if (typeof (pointTrailLength) !== 'number' || pointTrailLength < 0) {
    throw new Error('invalidPointTrailLength');
  }

  if (pointTrailLength === 0) { return []; }

  const pointsToHull = this.points.slice(0, hull.endIndex + 1);
  const pointTrail = pointsToHull.slice(-pointTrailLength);

  if (typeof (opt.which) !== 'undefined') {
    return pointTrail.map(point => point[opt.which]);
  }
  return pointTrail;
}
