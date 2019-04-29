import ViewingHullSeries from './ViewingHullSeries/ViewingHullSeries'

export default function getHullseries(opt) {
  // let t0 = performance.now()
  opt = opt || {}

  let hullseries = new ViewingHullSeries({
    viewing: this,
    points: this.gazepoints,
    period: opt.period,
    timestep: opt.timestep,
    includeIncomplete: opt.includeIncomplete,
    pointTrailLength: opt.pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  })

  // console.log('Viewing.getHullseries() duration: ' + helpers.formatNumber(performance.now() - t0) + ' ms')

  return hullseries
}
