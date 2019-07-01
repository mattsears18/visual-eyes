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
          Meteor.call('analyses.makeGlanceJobsJob', {
            analysisId: analysis._id,
          });

          console.log(
            `made glanceJobsJob for analysis: ${ai + 1} of ${analyses.length}`,
          );
        });
      }
    }
  },
});
