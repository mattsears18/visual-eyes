import Jobs from '../../../collections/Jobs/Jobs';

export default queueViewingsSaveAverageSlideHullCoverage = Jobs.processJobs('viewings.saveAverageSlideHullCoverage',
  {
    concurrency: 1,
  },
  function (jobDoc, callback) {
    Meteor.call('viewings.saveAverageSlideHullCoverage', {
      jobId: jobDoc._doc._id,
      callback: callback,
    });
  }
);
