import { TimeHullSeries } from 'time-hulls';
import getLayout from './imports/getLayout';
import getTraces from './imports/getTraces';
import getCentroidTrailTrace from './imports/getCentroidTrailTrace';
import getPointsTrace from './imports/getPointsTrace';
import getPointsTimeText from './imports/getPointsTimeText';
import getLastPointTrace from './imports/getLastPointTrace';
import getPointTrail from './imports/getPointTrail';
import getPointTrailTrace from './imports/getPointTrailTrace';
import getPolygonTrace from './imports/getPolygonTrace';
import getCentroidTrace from './imports/getCentroidTrace';
import getFrameData from './imports/getFrameData';

export default class VisitHullSeries extends TimeHullSeries {
  constructor(opts) {
    opts = opts || {};
    if (typeof opts.points === 'undefined') {
      if (typeof opts.visit !== 'undefined') {
        opts.points = opts.visit.fixations;
        opts.width = opts.width || opts.visit.stimulus() ? opts.visit.stimulus().width : 0;
        opts.height = opts.height || opts.visit.stimulus()
          ? opts.visit.stimulus().height
          : 0;
      }
    }

    super(opts);

    if (typeof opts.visit !== 'undefined') {
      this.visit = opts.visit;
    } else {
      throw new Error('noVisit');
    }

    this.pointTrailLength = typeof opts.pointTrailLength === 'number' && opts.pointTrailLength > 0
      ? parseInt(opts.pointTrailLength, 10)
      : 10;
  }

  getLayout = getLayout;

  getTraces = getTraces;

  getCentroidTrailTrace = getCentroidTrailTrace;

  getPointsTrace = getPointsTrace;

  getPointsTimeText = getPointsTimeText;

  getLastPointTrace = getLastPointTrace;

  getPointTrail = getPointTrail;

  getPointTrailTrace = getPointTrailTrace;

  getPolygonTrace = getPolygonTrace;

  getCentroidTrace = getCentroidTrace;

  getFrameData = getFrameData;

  getFrames = this.getHulls;
}
