import Jobs from '../../../collections/Jobs/Jobs';

export default queueViewingsSaveAverageSlideHullArea = Jobs.processJobs('viewings.saveAverageSlideHullArea',
  {
    concurrency: 1,
  },
  function (jobDoc, callback) {
    Meteor.call('viewings.saveAverageSlideHullArea', {
      jobId: jobDoc._doc._id,
      callback: callback,
    });
  }
);
