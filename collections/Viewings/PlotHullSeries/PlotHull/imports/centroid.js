export default function centroid({
  points = helpers.distinctPoints(this.polygon({})),
  which,
}) {
  let centroid;

  if(points.length == 1) centroid = points[0];
  if(points.length == 2) {
    centroid = {
      x: (points[0].x + points[1].x)/2,
      y: (points[0].y + points[1].y)/2,
    };
  }

  if(points.length > 2) {
    centroid = helpers.centroid(points);
  }

  if(typeof(which) != 'undefined') {
    return centroid[which];
  } else {
    return centroid;
  }
}
