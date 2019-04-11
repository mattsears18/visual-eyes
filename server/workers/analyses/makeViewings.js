import Jobs from '../../../collections/Jobs/Jobs';

export default queueAnalysesMakeViewings = Jobs.processJobs('analyses.makeViewings',
  { concurrency: 1 },
  async (job, callback) => {
    let analysis = Analyses.findOne({ _id: job.data.analysisId });
    if(!analysis) {
      console.log('Analysis not found. analysisId: ' + job.data.analysisId);
      job.cancel();
      job.remove();
    }

    try {
      analysis.makeViewings({
        participantId: job.data.participantId,
        stimulusId: job.data.stimulusId,
      });
      job.done();
    } catch(err) {
      console.log(err);
      job.cancel();
      job.remove();
    }

    // console.log('callback()');
    callback();
  }
);
