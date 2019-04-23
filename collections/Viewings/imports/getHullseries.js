import { TimeHullSeries } from 'time-hulls';

export default function getHullseries({
  period = 5000,
  timestep = 0,
  includeIncomplete = false,
  pointTrailLength = 10,
}) {
  return new TimeHullSeries({
    points: this.gazepoints,
    period: period,
    timestep: timestep,
    includeIncomplete: includeIncomplete,
    pointTrailLength: pointTrailLength,
    width: this.stimulus().width,
    height: this.stimulus().height,
  });
}
