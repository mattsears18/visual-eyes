import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeGazes'({ analysisId }) {
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      Gazes.remove({ analysisId: analysis._id });
    }
  },
});
