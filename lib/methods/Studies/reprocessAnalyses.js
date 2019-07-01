import Jobs from '../../../collections/Jobs/Jobs';
import Analyses from '../../../collections/Analyses/Analyses';

Meteor.methods({
  'studies.reprocessAnalyses'({ studyId }) {
    if (Meteor.isServer) {
      check(studyId, String);

      const study = Studies.findOne(studyId);

      if (study) {
        console.log('study.reprocessAnalyses');

        const analyses = Analyses.find({ studyId: this._id }).fetch();

        analyses.forEach(function(analysis, ai) {
          analysis.makeGazeJobsJob();

          console.log(
            `made gazeJobsJob for analysis: ${ai + 1} of ${analyses.length}`,
          );
        });
      }
    }
  },
});
