import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.makeGlanceJobsJob'({ analysisId }) {
    check(analysisId, String);

    if (Meteor.isServer) {
      console.log(`analyses.makeGlanceJobsJob() analysisId: ${analysisId}`);

      Jobs.remove({
        'data.analysisId': analysisId,
      });

      const analysis = Analyses.findOne(analysisId);

      if (analysis) {
        const job = new Job(Jobs, 'analyses.makeGlanceJobs', {
          analysisId: analysis._id,
        });

        job
          .priority('critical')
          .retry({
            retries: Jobs.forever,
            wait: 1000,
            backoff: 'constant', // wait constant amount of time between each retry
          })
          .save();
      }
    }
  },
});
