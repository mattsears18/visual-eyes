export default function coordinatesToXY(points) {
  return points.map(function(point) {
    return { x: point[0], y: point[1] };
  });
}
