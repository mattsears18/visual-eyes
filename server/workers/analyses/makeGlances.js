import Jobs from '../../../collections/Jobs/Jobs';

export default (queueAnalysesMakeGlances = Jobs.processJobs(
  'analyses.makeGlances',
  { concurrency: 1 },
  (job, callback) => {
    const analysis = Analyses.findOne({ _id: job.data.analysisId });
    if (!analysis) {
      console.log(
        `Analysis not found. analysisId: ${
          job.data.analysisId
        } Remove all jobs for this analysis.`,
      );

      Jobs.remove({ 'data.analysisId': job.data.analysisId });
    } else {
      try {
        const glanceIds = analysis.makeGlances({
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
        type: 'analyses.makeGlances',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      const completedJobCount = Jobs.find({
        type: 'analyses.makeGlances',
        status: 'completed',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      console.log(
        `makeGlances job completed, ${completedJobCount} of ${totalJobCount} ${helpers.formatNumber(
          (completedJobCount / totalJobCount) * 100,
        )}%`,
      );
    }

    callback();
  },
));
