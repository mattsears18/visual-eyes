Meteor.methods({
  'analyses.removeVisits'({ analysisId }) {
    console.log('Meteor Method: analyses.removeVisits()');
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      Visits.remove({ analysisId: analysis._id });
    }

    return true;
  },
});
