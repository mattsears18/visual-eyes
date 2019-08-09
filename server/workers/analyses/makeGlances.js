import Jobs from '../../../collections/Jobs/Jobs';
import Gazepoints from '../../../collections/Gazepoints/Gazepoints';
import Analyses from '../../../collections/Analyses/Analyses';

const gazepointCache = {};

const queueAnalysesMakeGlances = Jobs.processJobs(
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
        console.log(job.data.participantId);
        if (!(job.data.participantId in gazepointCache)) {
          console.log('participant gazepoints not cached. get em');

          gazepointCache[job.data.participantId] = Gazepoints.find(
            { participantId: job.data.participantId },
            {
              fields: {
                _id: 1,
                fileFormat: 1,
                stimulusId: 1,
                timestamp: 1,
                x: 1,
                y: 1,
                fixationIndex: 1,
                category: 1,
              },
              sort: { timestamp: 1 },
            },
          ).fetch();
        }

        const glanceIds = analysis.makeGlances({
          participantId: job.data.participantId,
          points: gazepointCache[job.data.participantId],
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
);

export default queueAnalysesMakeGlances;
