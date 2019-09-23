import Jobs from '../../../collections/Jobs/Jobs';
import Analyses from '../../../collections/Analyses/Analyses';
import Eyeevents from '../../../collections/Eyeevents/Eyeevents';

const eyeeventCache = {};

const queueAnalysesMakeVisits = Jobs.processJobs(
  'analyses.makeVisits',
  { concurrency: 1 },
  (job, callback) => {
    const analysis = Analyses.findOne({ _id: job.data.analysisId });

    if (!analysis) {
      console.log(
        `Analysis not found. analysisId: ${job.data.analysisId} Remove all jobs for this analysis.`,
      );

      Jobs.remove({ 'data.analysisId': job.data.analysisId });
    } else {
      Analyses.update(
        { _id: analysis._id },
        { $set: { status: 'processing' } },
      );

      try {
        if (!(job.data.participantId in eyeeventCache)) {
          console.log('participant fixations not cached. get em');

          // TODO FUTURE - handle blinks and saccades
          eyeeventCache[job.data.participantId] = Eyeevents.find(
            { participantId: job.data.participantId, type: 'Fixation' },
            {
              fields: {
                _id: 1,
                type: 1,
                participantId: 1,
                timestamp: 1,
                duration: 1,
                stimulusId: 1,
                aoiId: 1,
              },
              sort: { participantId: 1, timestamp: 1 },
            },
          ).fetch();
        }

        try {
          analysis.makeVisits({
            participantId: job.data.participantId,
            eyeevents: eyeeventCache[job.data.participantId],
          });

          job.done();
          analysis.updateStatus();
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
        job.cancel();
        job.remove();
      }

      const analyses = Analyses.find({ studyId: analysis.studyId }).fetch();

      const totalJobCount = Jobs.find({
        type: 'analyses.makeVisits',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      const completedJobCount = Jobs.find({
        type: 'analyses.makeVisits',
        status: 'completed',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      console.log(
        `makeVisits job completed, ${completedJobCount} of ${totalJobCount} ${helpers.formatNumber(
          (completedJobCount / totalJobCount) * 100,
        )}%`,
      );
    }

    callback();
  },
);

export default queueAnalysesMakeVisits;
