import ViewingHullSeries from './ViewingHullSeries/ViewingHullSeries';

export default function getHullseries(opt) {
  // let t0 = performance.now()

  opt = opt || {}
  let period = opt.period || 5000
  let timestep = opt.timestep || 0
  let includeIncomplete = opt.includeIncomplete || false
  let pointTrailLength = opt.pointTrailLength || 10

  let hullseries = new ViewingHullSeries({
    viewing: this,
    points: this.gazepoints,
    period: period,
    timestep: timestep,
    includeIncomplete: includeIncomplete,
    pointTrailLength: pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });

  // console.log('Viewing.getHullseries() duration: ' + helpers.formatNumber(performance.now() - t0) + ' ms')

  return hullseries;
}
