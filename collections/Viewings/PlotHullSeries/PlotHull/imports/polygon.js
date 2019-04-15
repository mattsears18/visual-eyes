import hull from 'hull.js';

export default function polygon({
  points = this.gazepoints(),
  which,
}) {
  let hullPoints = hull(this.XYToCoordinates(points), Infinity);

  hullPoints = this.coordinatesToXY(hullPoints);

  if(typeof(which) != 'undefined') {
    return hullPoints.map((point) => { return point[which]; });
  } else {
    return hullPoints;
  }
}
