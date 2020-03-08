import VisitHullSeries from './VisitHullSeries/VisitHullSeries';

export default function getHullseries(opt) {
  const { period } = opt || {};
  const { timestep } = opt || {};
  const { includeIncomplete } = opt || {};
  const { pointTrailLength } = opt || {};

  const fixations = this.getFixations().fetch();
  const points = fixations.map(f => {
    return { timestamp: f.timestamp, x: f.xMean, y: f.yMean };
  });

  const series = new VisitHullSeries({
    visit: this,
    points,
    period,
    timestep,
    includeIncomplete,
    pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });

  return series;
}
