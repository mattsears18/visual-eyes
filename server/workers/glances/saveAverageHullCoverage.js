import Jobs from '../../../collections/Jobs/Jobs';

export default (queueGlancesSaveAverageHullCoverage = Jobs.processJobs(
  'glances.saveAverageHullCoverage',
  { concurrency: 1 },
  (job, callback) => {
    const glance = Glances.findOne({ _id: job.data.glanceId });

    if (!glance) {
      console.log(`Glance not found. glanceId: ${job.data.glanceId}`);
      job.cancel();
      job.remove();
    } else {
      try {
        const avg = glance.saveAverageHullCoverage({
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

    glance.updateStatus();
    callback();
  },
));
