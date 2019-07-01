import Jobs from '../../../collections/Jobs/Jobs';

export default (queueAnalysesMakeGazes = Jobs.processJobs(
  'analyses.makeGazes',
  { concurrency: 1 },
  (job, callback) => {
    const analysis = Analyses.findOne({ _id: job.data.analysisId });
    if (!analysis) {
      console.log(`Analysis not found. analysisId: ${job.data.analysisId}`);
      job.cancel();
      job.remove();
    }

    try {
      const gazeIds = analysis.makeGazes({
        participantId: job.data.participantId,
        stimulusId: job.data.stimulusId,
      });
      job.done();
      analysis.updateStatus();
    } catch (err) {
      console.log(err);
      job.cancel();
      job.remove();
    }

    const analyses = Analyses.find({ studyId: analysis.studyId }).fetch();

    const totalJobCount = Jobs.find({
      type: 'analyses.makeGazes',
      'data.analysisId': { $in: analyses.map(a => a._id) },
    }).count();

    const completedJobCount = Jobs.find({
      type: 'analyses.makeGazes',
      status: 'completed',
      'data.analysisId': { $in: analyses.map(a => a._id) },
    }).count();

    console.log(
      `makeGazes job completed, ${completedJobCount} of ${totalJobCount} ${helpers.formatNumber(
        (completedJobCount / totalJobCount) * 100,
      )}%`,
    );

    callback();
  },
));
