import { jStat } from 'jStat';

export default function updateStatus() {
  if (this.allVisitsProcessed() && this.status != 'processed') {
    const visits = this.visits().fetch();
    const visitCount = visits.length;
    let visitDurationMean = 0;
    let visitDurationMedian = 0;

    if (visitCount > 0) {
      visitDurationMean = jStat.mean(
        visits.map(function(visit) {
          return visit.duration;
        }),
      );

      visitDurationMedian = jStat.median(
        visits.map(function(visit) {
          return visit.duration;
        }),
      );
    }

    Analyses.update(
      { _id: this._id },
      {
        $set: {
          status: 'processed',
          visitCount,
          visitDurationMean,
          visitDurationMedian,
        },
      },
    );
  } else {
    const visitCount = this.visits().count();
    Analyses.update(
      { _id: this._id },
      { $set: { status: 'processing', visitCount } },
    );
  }
}
