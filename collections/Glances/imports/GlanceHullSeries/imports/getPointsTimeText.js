export default function getPointsTimeText(opt) {
  opt = opt || {};
  const hull = this.getHull(opt);

  return hull.points.map(point => `Time: ${point.timestamp}ms`);
}
