import Jobs from '../../../collections/Jobs/Jobs';

export default (queueAnalysesMakeGlances = Jobs.processJobs(
  'analyses.makeGlances',
  { concurrency: 1 },
  (job, callback) => {
    const analysis = Analyses.findOne({ _id: job.data.analysisId });
    if (!analysis) {
      console.log(`Analysis not found. analysisId: ${job.data.analysisId}`);
      job.cancel();
      job.remove();
    }

    try {
      const glanceIds = analysis.makeGlances({
        participantId: job.data.participantId,
        stimulusId: job.data.stimulusId
      });
      job.done();
      analysis.updateStatus();
    } catch (err) {
      console.log(err);
      job.cancel();
      job.remove();
    }

    callback();
  }
));
