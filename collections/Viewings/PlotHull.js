import hull from 'hull.js';
var area = require('area-polygon');

export default class PlotHull {
  constructor(allRecordings, startIndex, endIndex) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    this.recordings = () => {
      return allRecordings.slice(this.startIndex, this.endIndex + 1)
    }

    this.timeStep = () => {
      if(this.startIndex > 0) {
        return this.recordings()[0].recordingTime - allRecordings[this.startIndex - 1].recordingTime;
      } else {
        return 0;
      }
    }
  }

  startTime() {
    return this.recordings()[0].recordingTime;
  }

  endTime() {
    return this.recordings()[this.recordings().length - 1].recordingTime;
  }

  duration() {
    return this.endTime() - this.startTime();
  }

  points(index) {
    let ps = this.recordings().map(function(recording) {
      return [parseInt(recording.x), parseInt(recording.y)];
    });

    if(typeof(index) !== 'undefined') {
      return ps.map((point) => { return point[index]; });
    } else {
      return ps;
    }
  }

  fixationTrail(length, index) {
    let trail = this.points().slice(-length);
    if(typeof(index) !== 'undefined') {
      return trail.map((point) => { return point[index]; });
    } else {
      return trail;
    }
  }

  pointsTime() {
    return this.recordings().map(function(recording) {
      return recording.recordingTime;
    });
  }

  pointsTimeText() {
    return this.recordings().map(function(recording) {
      return 'Time: ' + recording.recordingTime + 'ms';
    });
  }

  polygon(index) {
    let hullPoints = hull(this.points(), Infinity);

    if(typeof(index) !== 'undefined') {
      return hullPoints.map((point) => { return point[index]; });
    } else {
      return hullPoints;
    }
  }

  area() {
    return area(this.points());
  }

  centroid() {
    return helpers.centroid(this.coordinatesToXY(this.polygon()));
  }

  coordinatesToXY(points) {
    return points.map(function(point) {
      return { x: point[0], y: point[1] };
    });
  }
}
