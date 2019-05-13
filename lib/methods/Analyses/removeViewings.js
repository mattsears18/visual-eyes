import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeViewings'({ analysisId }) {
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      Viewings.remove({ analysisId: analysis._id });
    }
  },
});
