import VisitHullSeries from './VisitHullSeries/VisitHullSeries';

export default function getHullseries(opt) {
  const { period } = opt || {};
  const { timestep } = opt || {};
  const { includeIncomplete } = opt || {};
  const { pointTrailLength } = opt || {};

  const series = new VisitHullSeries({
    visit: this,
    points: this.gazepoints,
    period,
    timestep,
    includeIncomplete,
    pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });

  return series;
}
