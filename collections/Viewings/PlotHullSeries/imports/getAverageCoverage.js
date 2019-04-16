import { jStat } from 'jStat';

export default function getAverageCoverage() {
  let hulls = this.getHulls();
  let coverageDurations = hulls.map(hull => hull.coverageDuration());
  let durations = hulls.map(hull => hull.duration());

  let avg = 0;

  if(jStat.sum(durations) > 0) {
    avg = jStat.sum(coverageDurations) / jStat.sum(durations);
  }

  return avg;
}
