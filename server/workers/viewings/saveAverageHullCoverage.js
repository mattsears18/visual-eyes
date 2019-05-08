import Jobs from "../../../collections/Jobs/Jobs";

export default (queueViewingsSaveAverageHullCoverage = Jobs.processJobs(
  "viewings.saveAverageHullCoverage",
  { concurrency: 1 },
  (job, callback) => {
    let viewing = Viewings.findOne({ _id: job.data.viewingId });

    if (!viewing) {
      console.log("Viewing not found. viewingId: " + job.data.viewingId);
      job.cancel();
      job.remove();
    } else {
      try {
        let avg = viewing.saveAverageHullCoverage({
          slideStep: job.data.slideStep,
          instantContinuous: job.data.instantContinuous
        });
        job.done();
      } catch (err) {
        if (["invalidStimulusDimensions"].indexOf(err.message) != -1) {
          console.log("invalid stimulus dimensions");
          job.cancel();
        } else {
          console.log(err);
        }
      }
    }

    viewing.updateStatus();
    callback();
  }
));
