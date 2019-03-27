import hull from 'hull.js';
var area = require('area-polygon');

export default class PlotHull {
  constructor(viewing, startIndex, endIndex) {
    this.viewing = () => { return viewing; };
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    this.duration = () => {
      if(this.viewing().gazepoints[this.endIndex + 1]) {
        return (this.viewing().gazepoints[this.endIndex + 1].timestamp - this.endTime());
      } else {
        return 0;
      }
    }
  }

  gazepoints() {
    return this.viewing().gazepoints.slice(this.startIndex, this.endIndex + 1);
  }

  startTime() {
    return this.gazepoints()[0].timestamp;
  }

  endTime() {
    return this.gazepoints()[this.gazepoints().length - 1].timestamp;
  }

  period() {
    return (this.endTime() - this.startTime());
  }

  timeStep() {
    if(this.gazepoints() && this.gazepoints().length > 2) {
      return (this.gazepoints()[this.gazepoints().length - 1].timestamp -
              this.gazepoints()[this.gazepoints().length - 2].timestamp);
    } else {
      return 0;
    }
  }

  area() {
    if(this.gazepoints().length > 2) {
      return area(this.gazepoints());
    } else {
      return 0;
    }
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

  distance(index) {
    if(typeof(index) != 'undefined') {
      if(this.gazepoints() && this.gazepoints().length > 2) {
        return (this.gazepoints()[this.gazepoints().length - 1][index] - this.gazepoints()[this.gazepoints().length - 2][index]);
      } else {
        return 0;
      }
    } else {
      return Math.sqrt((this.distance(0) * this.distance(0) + this.distance(1) * this.distance(1)));
    }
  }

  velocity() {
    if(this.timeStep() > 0 && this.distance() > 0) {
      return (this.distance() / this.timeStep());
    } else {
      return 0;
    }
  }

  lastGazepoint(index) {
    if(this.gazepoints() && this.gazepoints().length) {
      return this.gazepoints()[this.gazepoints().length - 1];
    }
  }

  gazepoints(index) {
    if(this.viewing() && this.viewing().stimulus() && this.viewing().stimulus().width > 0 && this.viewing().stimulus().height > 0) {
      let ps = this.gazepoints().map((gazepoint) => {
        return [
          +(gazepoint.x / this.viewing().stimulus().width).toFixed(10),
          +(gazepoint.y / this.viewing().stimulus().height).toFixed(10)
        ];
      });

      if(typeof(index) !== 'undefined') {
        return ps.map((point) => { return point[index]; });
      } else {
        return ps;
      }
    } else {
      return [];
    }
  }

  fixationTrail(length, index) {
    let trailStart = Math.max((this.endIndex + 1 - length), 0);
    let trailEnd = (this.endIndex + 1);
    let trail = this.XYToCoordinates(this.viewing().gazepoints).slice(trailStart, trailEnd);
    if(typeof(index) !== 'undefined') {
      return trail.map((point) => {
        return point[index];
      });
    } else {
      return trail;
    }
  }

  gazepointsTime() {
    return this.gazepoints().map(function(gazepoint) {
      return gazepoint.timestamp;
    });
  }

  gazepointsTimeText() {
    return this.gazepoints().map(function(gazepoint) {
      return 'Time: ' + gazepoint.timestamp + 'ms';
    });
  }

  polygon(index) {
    let hullPoints = hull(this.gazepoints(), Infinity);

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
