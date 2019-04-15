import hull from 'hull.js';

export default function polygon(which) {
  let hullPoints = hull(this.XYToCoordinates(this.gazepoints()), Infinity);

  if(typeof(which) != 'undefined') {
    return hullPoints.map((point) => { return point[which]; });
  } else {
    return hullPoints;
  }
}
