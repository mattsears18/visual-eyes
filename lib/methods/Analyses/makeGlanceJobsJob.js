import Analyses from '../../../collections/Analyses/Analyses';

Meteor.methods({
  'analyses.makeGlanceJobsJob'({ analysisId }) {
    // this method is only necessary to allow a user to manually
    // reprocess a single analysis (from the client)
    check(analysisId, String);
    const analysis = Analyses.findOne(analysisId);
    if (analysis) analysis.makeGlanceJobsJob();
  },
});
