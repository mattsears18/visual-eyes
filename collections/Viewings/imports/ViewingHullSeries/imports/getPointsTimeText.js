export default function getPointsTimeText(opt) {
  opt = opt || {}
  let hull = this.getHull(opt)

  return hull.points.map((point) => {
    return 'Time: ' + point.timestamp + 'ms'
  })
}
