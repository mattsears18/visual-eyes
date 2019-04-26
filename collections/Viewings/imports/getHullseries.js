import ViewingHullSeries from './ViewingHullSeries/ViewingHullSeries';

export default function getHullseries(opt) {
  opt = opt || {}
  let period = opt.period || 5000
  let timestep = opt.timestep || 0
  let includeIncomplete = opt.includeIncomplete || false
  let pointTrailLength = opt.pointTrailLength || 10

  return new ViewingHullSeries({
    viewing: this,
    points: this.gazepoints,
    period: period,
    timestep: timestep,
    includeIncomplete: includeIncomplete,
    pointTrailLength: pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });
}
