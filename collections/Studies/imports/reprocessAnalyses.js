import Jobs from '../../Jobs/Jobs';
import Analyses from '../../Analyses/Analyses';

export default function reprocessAnalyses() {
  if (Meteor.isServer) {
    console.log(`study.reprocessAnalyses() studyId: ${this._id}`);

    const analyses = Analyses.find({ studyId: this._id }).fetch();

    Jobs.remove({
      'data.analysisId': { $in: analyses.map(a => a._id) },
    });

    analyses.forEach(function(analysis, ai) {
      Analyses.update(
        { _id: analysis._id },
        {
          $unset: {
            status: 1,
            glanceCount: 1,
            glanceDurationMean: 1,
            glanceDurationMedian: 1,
          },
        },
      );
      Meteor.call('analyses.makeGlanceJobsJob', {
        analysisId: analysis._id,
      });

      console.log(
        `made glanceJobsJob for analysis: ${ai + 1} of ${analyses.length}`,
      );
    });
  }
}
