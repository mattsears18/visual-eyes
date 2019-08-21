import VisitHullSeries from './VisitHullSeries/VisitHullSeries';

export default function getHullseries(opt) {
  opt = opt || {};

  return new VisitHullSeries({
    visit: this,
    points: this.gazepoints,
    period: opt.period,
    timestep: opt.timestep,
    includeIncomplete: opt.includeIncomplete,
    pointTrailLength: opt.pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });
}
