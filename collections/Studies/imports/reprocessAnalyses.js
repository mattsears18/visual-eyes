import Jobs from '../../Jobs/Jobs';

export default function reprocessAnalyses() {
  if (Meteor.isServer) {
    console.log(`study.reprocessAnalyses() studyId: ${this._id}`);

    const analyses = Analyses.find({ studyId: this._id }).fetch();

    Jobs.remove({
      'data.analysisId': { $in: analyses.map(a => a._id) },
    });

    analyses.forEach(function(analysis, ai) {
      Meteor.call('analyses.makeGlanceJobsJob', {
        analysisId: analysis._id,
      });

      console.log(
        `made glanceJobsJob for analysis: ${ai + 1} of ${analyses.length}`,
      );
    });
  }
}
