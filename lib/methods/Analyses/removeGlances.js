Meteor.methods({
  'analyses.removeGlances'({ analysisId }) {
    console.log('Meteor Method: analyses.removeGlances()');
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);
    console.log(analysisId);

    const hrStart = process.hrtime();
    if (analysis) {
      Glances.remove({ analysisId: analysis._id });
    }
    const hrEnd = process.hrtime(hrStart);

    console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);

    return true;
  },
});
