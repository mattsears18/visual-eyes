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

export default class ViewingHullSeries extends TimeHullSeries {
  constructor(opt) {
    opt = opt || {};
    if (typeof opt.points === 'undefined') {
      if (typeof opt.viewing !== 'undefined') {
        opt.points = opt.viewing.gazepoints;
        opt.width = opt.width || opt.viewing.stimulus()
          ? opt.viewing.stimulus().width
          : 0;
        opt.height = opt.height || opt.viewing.stimulus()
          ? opt.viewing.stimulus().height
          : 0;
      }
    }

    super(opt);

    if (typeof opt.viewing !== 'undefined') {
      this.viewing = opt.viewing;
    } else {
      throw new Error('noViewing');
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
