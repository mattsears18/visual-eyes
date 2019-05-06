import ViewingHullSeries from './ViewingHullSeries/ViewingHullSeries'

export default function getHullseries(opt) {
  opt = opt || {};

  return new ViewingHullSeries({
    viewing: this,
    points: this.gazepoints,
    period: opt.period,
    timestep: opt.timestep,
    includeIncomplete: opt.includeIncomplete,
    pointTrailLength: opt.pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  })
}
