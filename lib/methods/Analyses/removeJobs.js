import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeJobs'({ analysisId }) {
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      Jobs.remove({ 'data.analysisId': analysis._id });
    }
  },
});
