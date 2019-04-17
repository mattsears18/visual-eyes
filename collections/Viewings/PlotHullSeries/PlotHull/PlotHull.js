import coordinatesToXY            from './imports/coordinatesToXY';
import XYToCoordinates            from './imports/XYToCoordinates';
import gazepoints                 from './imports/gazepoints';
import timeStep                   from './imports/timeStep';
import distance                   from './imports/distance';
import azimuth                    from './imports/azimuth';
import velocity                   from './imports/velocity';
import fixationTrail              from './imports/fixationTrail';
import polygon                    from './imports/polygon';
import area                       from './imports/area';
import coverage                   from './imports/coverage';
import centroid                   from './imports/centroid';
import getPointsTrace             from './imports/getPointsTrace';
import getLastPointTrailTrace     from './imports/getLastPointTrailTrace';
import getCentroidTrace           from './imports/getCentroidTrace';
import getPolygonTrace            from './imports/getPolygonTrace';
import getLastPointTrace          from './imports/getLastPointTrace';

export default class PlotHull {
  coordinatesToXY = coordinatesToXY;
  XYToCoordinates = XYToCoordinates;
  gazepoints = gazepoints;
  timeStep = timeStep;
  distance = distance;
  azimuth = azimuth;
  velocity = velocity;
  fixationTrail = fixationTrail;
  polygon = polygon;
  area = area;
  coverage = coverage;
  centroid = centroid;
  getPointsTrace = getPointsTrace;
  getLastPointTrailTrace = getLastPointTrailTrace;
  getCentroidTrace = getCentroidTrace;
  getPolygonTrace = getPolygonTrace;
  getLastPointTrace = getLastPointTrace;

  constructor({
    viewing,
    fixationTrailLength,
    startIndex = 0,
    endIndex,
  }) {
    if(!viewing) { throw new Error('noViewing') }
    if(!viewing.gazepoints.length) { throw new Error('noGazepoints') }

    if(!endIndex) {
      endIndex = viewing.gazepoints.length - 1;
    }

    this.viewing = () => { return viewing; };
    this.fixationTrailLength = fixationTrailLength;
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

  coveragePercent({ points = helpers.distinctPoints(this.polygon({})) }) {
    return (this.coverage({ points: points }) * 100);
  }

  coverageDuration() {
    return (this.coverage({}) * this.duration());
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
}
