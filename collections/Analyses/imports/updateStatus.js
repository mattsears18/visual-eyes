import { jStat } from 'jStat';

export default function updateStatus() {
  if (this.allGlancesProcessed() && this.status != 'processed') {
    const glances = this.glances().fetch();

    const glanceCount = glances.length;
    const glanceDurationMean = jStat.mean(
      glances.map(function(glance) {
        return glance.duration;
      }),
    );

    const glanceDurationMedian = jStat.median(
      glances.map(function(glance) {
        return glance.duration;
      }),
    );

    Analyses.update(
      { _id: this._id },
      {
        $set: {
          status: 'processed',
          glanceCount,
          glanceDurationMean,
          glanceDurationMedian,
        },
      },
    );
  } else {
    const glanceCount = this.glances().count();
    Analyses.update(
      { _id: this._id },
      { $set: { status: 'processing', glanceCount } },
    );
  }
}
