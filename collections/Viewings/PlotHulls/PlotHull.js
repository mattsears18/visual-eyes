import hull from 'hull.js';
var area = require('area-polygon');

export default class PlotHull {
  constructor(viewing, startIndex, endIndex) {
    this.viewing = () => { return viewing; };
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    this.duration = () => {
      if(this.viewing().recordingPoints[this.endIndex + 1]) {
        return (this.viewing().recordingPoints[this.endIndex + 1].recordingTime - this.endTime());
      } else {
        return 0;
      }
    }
  }

  recordings() {
    return this.viewing().recordingPoints.slice(this.startIndex, this.endIndex + 1);
  }

  startTime() {
    return this.recordings()[0].recordingTime;
  }

  endTime() {
    return this.recordings()[this.recordings().length - 1].recordingTime;
  }

  period() {
    return (this.endTime() - this.startTime());
  }

  timeStep() {
    if(this.startIndex > 0) {
      return (this.recordings()[this.recordings().length - 1].recordingTime -
              this.recordings()[this.recordings().length - 2].recordingTime);
    } else {
      return 0;
    }
  }

  area() {
    return area(this.points());
  }

  areaDuration() {
    return (this.area() * this.duration());
  }

  coverage() {
    return (this.area() / this.viewing().stimulus().area());
  }

  coveragePercent() {
    return (this.coverage() * 100);
  }

  coverageDuration() {
    return (this.coverage() * this.duration());
  }

  distanceX() {
    if(this.startIndex > 0) {
      return (this.recordings()[this.recordings().length - 1].x - this.recordings()[this.recordings().length - 2].x);
    } else {
      return 0;
    }
  }

  distanceY() {
    if(this.startIndex > 0) {
      return (this.recordings()[this.recordings().length - 1].y - this.recordings()[this.recordings().length - 2].y);
    } else {
      return 0;
    }
  }

  distance() {
    return Math.sqrt((this.distanceX() * this.distanceX() + this.distanceY() * this.distanceY()));
  }

  lastPointX() {
    return this.recordings()[this.recordings().length - 1].x;
  }

  lastPointY() {
    return this.recordings()[this.recordings().length - 1].y;
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
    let trailStart = Math.max((this.endIndex + 1 - length), 0);
    let trailEnd = (this.endIndex + 1);
    let trail = this.XYToCoordinates(this.viewing().recordingPoints).slice(trailStart, trailEnd);
    if(typeof(index) !== 'undefined') {
      return trail.map((point) => {
        return point[index];
      });
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

  centroid() {
    return helpers.centroid(this.coordinatesToXY(this.polygon()));
  }

  coordinatesToXY(points) {
    return points.map(function(point) {
      return { x: point[0], y: point[1] };
    });
  }

  XYToCoordinates(points) {
    return points.map(function(point) {
      return [parseInt(point.x), parseInt(point.y)];
    });
  }
}
