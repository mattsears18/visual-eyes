export default function centroid({
  points = helpers.distinctPoints(this.coordinatesToXY(this.polygon({}))),
}) {
  if(points.length == 1) return points[0];
  if(points.length == 2) {
    return {
      x: (points[0].x + points[1].x)/2,
      y: (points[0].y + points[1].y)/2,
    };
  }

  return helpers.centroid(points);
}
