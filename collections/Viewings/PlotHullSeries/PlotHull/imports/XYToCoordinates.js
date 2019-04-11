export default function XYToCoordinates(points) {
  return points.map(function(point) {
    return [point.x, point.y];
  });
}
