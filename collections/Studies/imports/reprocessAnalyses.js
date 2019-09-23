import Jobs from '../../Jobs/Jobs';
import Analyses from '../../Analyses/Analyses';

export default function reprocessAnalyses() {
  if (Meteor.isServer) {
    console.log(`Study.reprocessAnalyses() studyId: ${this._id}`);

    const analyses = Analyses.find({ studyId: this._id }).fetch();

    Jobs.remove({
      'data.analysisId': { $in: analyses.map(a => a._id) },
    });

    analyses.forEach(function(analysis, ai) {
      Analyses.update(
        { _id: analysis._id },
        {
          $unset: {
            visitCount: 1,
            visitDurationMean: 1,
            visitDurationMedian: 1,
          },
          $set: { status: 'needsProcessing' },
        },
      );
      Meteor.call('analyses.makeVisitJobsJob', {
        analysisId: analysis._id,
      });

      console.log(
        `made visitJobsJob for analysis: ${ai + 1} of ${analyses.length}`,
      );
    });
  }
}
