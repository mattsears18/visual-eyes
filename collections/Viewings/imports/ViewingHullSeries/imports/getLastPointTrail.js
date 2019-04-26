export default function getLastPointTrail(opt) {
  opt = opt || {}
  let hull = opt.hull
  let pointTrailLength = opt.pointTrailLength || 10
  let which = opt.which

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull');
  }

  return [] //TODO
}
