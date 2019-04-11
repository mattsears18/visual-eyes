import hull                 from 'hull.js';
import gazepoints           from './imports/gazepoints';
import timestep             from './imports/timestep';
import coverage             from './imports/coverage';
import distance             from './imports/distance';
import velocity             from './imports/velocity';
import fixationTrail        from './imports/fixationTrail';
import polygon              from './imports/polygon';
import coordinatesToXY      from './imports/coordinatesToXY';
import XYToCoordinates      from './imports/XYToCoordinates';

export default class PlotHull {
  gazepoints = gazepoints;
  timestep = timestep;
  coverage = coverage;
  distance = distance;
  velocity = velocity;
  fixationTrail = fixationTrail;
  polygon = polygon;
  coordinatesToXY = coordinatesToXY;
  XYToCoordinates = XYToCoordinates;

  constructor({
    viewing,
    startIndex = 0,
    endIndex,
  }) {
    if(!viewing) { throw new Error('noViewing') }
    if(!viewing.gazepoints.length) { throw new Error('noGazepoints') }

    if(!endIndex) {
      endIndex = viewing.gazepoints.length - 1;
    }

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

  startTime() {
    return this.gazepoints()[0].timestamp;
  }

  endTime() {
    return this.gazepoints()[this.gazepoints().length - 1].timestamp;
  }

  period() {
    return (this.endTime() - this.startTime());
  }

  coveragePercent() {
    return (this.coverage() * 100);
  }

  coverageDuration() {
    return (this.coverage() * this.duration());
  }

  lastGazepoint() {
    return this.gazepoints()[this.gazepoints().length - 1];
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

  centroid() {
    return helpers.centroid(this.coordinatesToXY(this.polygon()));
  }
}
