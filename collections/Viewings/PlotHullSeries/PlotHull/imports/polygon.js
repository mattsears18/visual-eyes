import hull from 'hull.js';

export default function polygon(index) {
  let hullPoints = hull(this.XYToCoordinates(this.gazepoints()), Infinity);

  if(typeof(index) != 'undefined') {
    return hullPoints.map((point) => { return point[index]; });
  } else {
    return hullPoints;
  }
}
