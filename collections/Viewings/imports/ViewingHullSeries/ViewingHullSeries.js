import { TimeHullSeries }       from 'time-hulls'
import getLayout                from './imports/getLayout'
import getPlotData              from './imports/getPlotData'
import getTraces                from './imports/getTraces'
import getCentroidTrailTrace    from './imports/getCentroidTrailTrace'
import getPointsTrace           from './imports/getPointsTrace'
import getPointsTimeText        from './imports/getPointsTimeText'
import getLastPointTrace        from './imports/getLastPointTrace'
import getLastPointTrail        from './imports/getLastPointTrail'
import getLastPointTrailTrace   from './imports/getLastPointTrailTrace'
import getPolygonTrace          from './imports/getPolygonTrace'
import getCentroidTrace         from './imports/getCentroidTrace'

export default class ViewingHullSeries extends TimeHullSeries {
  constructor(opt) {
    opt = opt || {}
    if(typeof(opt.points) == 'undefined') {
      if(typeof(opt.viewing) != 'undefined') {
        opt.points = opt.viewing.gazepoints
      }
    }

    super(opt)

    if(typeof(opt.viewing) != 'undefined') {
      this.viewing = opt.viewing
    } else {
      throw new Error('noViewing')
    }

    this.pointTrailLength = (typeof(opt.pointTrailLength) == 'number' && opt.pointTrailLength > 0)
      ? parseInt(opt.pointTrailLength)
      : 10
  }

  getPlotData             = getPlotData
  getLayout               = getLayout
  getTraces               = getTraces
  getCentroidTrailTrace   = getCentroidTrailTrace
  getPointsTrace          = getPointsTrace
  getPointsTimeText       = getPointsTimeText
  getLastPointTrace       = getLastPointTrace
  getLastPointTrail       = getLastPointTrail
  getLastPointTrailTrace  = getLastPointTrailTrace
  getPolygonTrace         = getPolygonTrace
  getCentroidTrace        = getCentroidTrace

  getFrames               = this.getHulls
  getFrameData            = this.getTraces
}
