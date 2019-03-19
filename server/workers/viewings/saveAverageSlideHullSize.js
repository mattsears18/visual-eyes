import Jobs from '../../../collections/Jobs/Jobs';

export default queueViewingsSaveAverageSlideHullSize = Jobs.processJobs('viewings.saveAverageSlideHullSize',
  {
    concurrency: 1,
  },
  function (jobDoc, callback) {
    Meteor.call('viewings.saveAverageSlideHullSize', {
      jobId: jobDoc._doc._id,
      callback: callback,
    });
  }
);
