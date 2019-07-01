import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeGlances'({ analysisId }) {
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      Glances.remove({ analysisId: analysis._id });
    }
  },
});
