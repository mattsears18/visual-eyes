import Jobs from '../../../collections/Jobs/Jobs';

export default (queueVisitsSaveAverageHullCoverage = Jobs.processJobs(
  'visits.saveAverageHullCoverage',
  { concurrency: 1 },
  (job, callback) => {
    const visit = Visits.findOne({ _id: job.data.visitId });

    if (!visit) {
      console.log(`Visit not found. visitId: ${job.data.visitId}`);
      job.cancel();
      job.remove();
    } else {
      try {
        const avg = visit.saveAverageHullCoverage({
          slideStep: job.data.slideStep,
          instantContinuous: job.data.instantContinuous,
        });
        job.done();
      } catch (err) {
        if (['invalidStimulusDimensions'].indexOf(err.message) != -1) {
          console.log('invalid stimulus dimensions');
          job.cancel();
        } else {
          console.log(err);
        }
      }
    }

    visit.updateStatus();
    callback();
  },
));
