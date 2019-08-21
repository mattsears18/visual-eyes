import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.removeJobs'({ analysisId }) {
    console.log('Meteor Method: analyses.removeJobs()');
    check(analysisId, String);

    const analysis = Analyses.findOne(analysisId);

    if (analysis) {
      const numRemoved = Jobs.remove({
        type: 'analyses.makeVisits',
        'data.analysisId': analysis._id,
      });

      if (numRemoved > 0) console.log(`removed ${numRemoved}makeVisits jobs`);
    }

    return true;
  },
});
