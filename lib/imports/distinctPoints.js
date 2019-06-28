export default function distinctPoints(points) {
  const distinct = [];
  for (i = 0; i < points.length; i++) {
    if (distinct.findIndex(e => (e.x === points[i].x && e.y === points[i].y)) < 0) {
      distinct.push(points[i]);
    }
  }
  return distinct;
}
