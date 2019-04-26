export default function getPointsTimeText(opt) {
  opt = opt || {}
  let hull = opt.hull

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull');
  }

  return hull.points.map((point) => {
    return 'Time: ' + point.timestamp + 'ms';
  });
}
