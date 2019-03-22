import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'viewings.makeHullJobs'({ viewingId }) {

    viewing = Viewings.findOne({ _id: viewingId });
    if(viewing) {
      var job = new Job(Jobs, 'viewings.saveAverageSlideHullArea',
        {
          viewingId: viewingId,
          analysisId: viewing.analysisId,
        }
      );

      job.priority('normal')
        .retry({
          retries: Jobs.forever,   // Retry 5 times,
          wait: 5*1000,  // waiting 5 seconds between attempts
          backoff: 'constant'  // wait constant amount of time between each retry
        })
        .save();
    }
  },
});
