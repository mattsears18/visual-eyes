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

export default class GlanceHullSeries extends TimeHullSeries {
  constructor(opt) {
    opt = opt || {};
    if (typeof opt.points === 'undefined') {
      if (typeof opt.glance !== 'undefined') {
        opt.points = opt.glance.gazepoints;
        opt.width = opt.width || opt.glance.stimulus()
          ? opt.glance.stimulus().width
          : 0;
        opt.height = opt.height || opt.glance.stimulus()
          ? opt.glance.stimulus().height
          : 0;
      }
    }

    super(opt);

    if (typeof opt.glance !== 'undefined') {
      this.glance = opt.glance;
    } else {
      throw new Error('noGlance');
    }

    this.pointTrailLength = typeof opt.pointTrailLength === 'number' && opt.pointTrailLength > 0
      ? parseInt(opt.pointTrailLength)
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
