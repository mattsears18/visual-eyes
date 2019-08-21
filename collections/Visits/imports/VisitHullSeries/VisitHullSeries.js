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
  constructor(opt) {
    opt = opt || {};
    if (typeof opt.points === 'undefined') {
      if (typeof opt.visit !== 'undefined') {
        opt.points = opt.visit.gazepoints;
        opt.width = opt.width || opt.visit.stimulus() ? opt.visit.stimulus().width : 0;
        opt.height = opt.height || opt.visit.stimulus()
          ? opt.visit.stimulus().height
          : 0;
      }
    }

    super(opt);

    if (typeof opt.visit !== 'undefined') {
      this.visit = opt.visit;
    } else {
      throw new Error('noVisit');
    }

    this.pointTrailLength = typeof opt.pointTrailLength === 'number' && opt.pointTrailLength > 0
      ? parseInt(opt.pointTrailLength, 10)
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
