import Jobs from '../../../collections/Jobs/Jobs';

export default queueViewingsSaveAverageHullCoverage = Jobs.processJobs('viewings.saveAverageHullCoverage',
  { concurrency: 1 },
  (job, callback) => {
    let viewing = Viewings.findOne({ _id: job.data.viewingId });

    if(!viewing) {
      console.log('Viewing not found. viewingId: ' + job.data.viewingId);
      job.cancel();
      job.remove();
    } else {
      try {
        viewing.saveAverageHullCoverage({ slideStep: job.data.slideStep });
        job.done();
      } catch(err) {
        console.log(err);
      }
    }

    console.log('callback()');
    console.log('check if all viewings processed. if so, update analysis status to processed');
    callback();
  }
);
