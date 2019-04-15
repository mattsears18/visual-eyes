import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeViewings'({ analysisId }) {
    check(analysisId, String);

    let analysis = Analyses.findOne(analysisId);

    if(analysis) {
      Viewings.remove({ analysisId: analysis._id });
    }
  },
});
