import Jobs from '../../../collections/Jobs/Jobs';

export default (queueGazesSaveAverageHullCoverage = Jobs.processJobs(
  'gazes.saveAverageHullCoverage',
  { concurrency: 1 },
  (job, callback) => {
    const gaze = Gazes.findOne({ _id: job.data.gazeId });

    if (!gaze) {
      console.log(`Gaze not found. gazeId: ${job.data.gazeId}`);
      job.cancel();
      job.remove();
    } else {
      try {
        const avg = gaze.saveAverageHullCoverage({
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

    gaze.updateStatus();
    callback();
  },
));
