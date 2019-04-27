export default function getLastPointTrail(opt) {
  opt = opt || {}
  let hull = opt.hull
  let which = opt.which
  let pointTrailLength = opt.pointTrailLength || this.pointTrailLength

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull')
  }

  let pointsToHull = this.points.slice(0, hull.endIndex + 1)
  let pointsTrail = pointsToHull.slice(-pointTrailLength)

  if(typeof(which) != 'undefined') {
    return pointsTrail.map(point => point[which]);
  } else {
    return pointTrail;
  }
}
