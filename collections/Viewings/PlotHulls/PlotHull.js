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

  gazepoints(which) {
    let gp = this.viewing().gazepoints.slice(this.startIndex, this.endIndex + 1);
    if(typeof(which) != 'undefined') {
      return gp.map((gazepoint) => { return gazepoint[which]; });
    } else {
      return gp;
    }
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

  coverage() {
    if(this.gazepoints().length > 2) {
      return area(this.gazepoints());
    } else {
      return 0;
    }
  }

  coveragePercent() {
    return (this.coverage() * 100);
  }

  coverageDuration() {
    return (this.coverage() * this.duration());
  }

  distance(which) {
    if(typeof(which) != 'undefined') {
      if(this.gazepoints() && this.gazepoints().length > 2) {
        return (this.gazepoints()[this.gazepoints().length - 1][which] - this.gazepoints()[this.gazepoints().length - 2][which]);
      } else {
        return 0;
      }
    } else {
      return Math.sqrt((this.distance('x') * this.distance('x') + this.distance('y') * this.distance('y')));
    }
  }

  velocity() {
    if(this.timeStep() > 0 && this.distance() > 0) {
      return (this.distance() / this.timeStep());
    } else {
      return 0;
    }
  }

  lastGazepoint() {
    if(this.gazepoints() && this.gazepoints().length) {
      return this.gazepoints()[this.gazepoints().length - 1];
    }
  }

  fixationTrail(length, index) {
    let trailStart = Math.max((this.endIndex + 1 - length), 0);
    let trailEnd = (this.endIndex + 1);
    let trail = this.viewing().gazepoints.slice(trailStart, trailEnd);
    if(typeof(index) != 'undefined') {
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
      return 'Time: ' + helpers.formatNumber(gazepoint.timestamp) + 'ms';
    });
  }

  polygon(index) {
    let hullPoints = hull(this.XYToCoordinates(this.gazepoints()), Infinity);

    if(typeof(index) != 'undefined') {
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
      return [point.x, point.y];
    });
  }
}
