import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeViewingsAndJobs'({ analysisId }) {
    check(analysisId, String);

    let analysis = Analyses.findOne(analysisId);

    if(analysis) {
      Viewings.remove({ analysisId: analysis._id });
      Jobs.remove({ 'data.analysisId': analysis._id });
    }
  },
});
