import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeJobs'({ analysisId }) {
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      const numRemoved = Jobs.remove({
        type: 'analyses.makeGlances',
        'data.analysisId': analysis._id,
      });

      if (numRemoved > 0) console.log(`removed ${numRemoved}makeGlances jobs`);
    }
  },
});
