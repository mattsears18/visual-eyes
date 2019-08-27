import Jobs from '../../../collections/Jobs/Jobs';
import Gazepoints from '../../../collections/Gazepoints/Gazepoints';
import Analyses from '../../../collections/Analyses/Analyses';
import Eyeevents from '../../../collections/Eyeevents/Eyeevents';

// const gazepointCache = {};
const fixationCache = {};

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
      try {
        // if (!(job.data.participantId in gazepointCache)) {
        //   console.log('participant gazepoints not cached. get em');

        //   gazepointCache[job.data.participantId] = Gazepoints.find(
        //     { participantId: job.data.participantId },
        //     {
        //       fields: {
        //         _id: 1,
        //         fileFormat: 1,
        //         stimulusId: 1,
        //         timestamp: 1,
        //         x: 1,
        //         y: 1,
        //         eventIndex: 1,
        //         category: 1,
        //       },
        //       sort: { timestamp: 1 },
        //     },
        //   ).fetch();
        // }

        if (!(job.data.participantId in fixationCache)) {
          console.log('participant fixations not cached. get em');

          fixationCache[job.data.participantId] = Eyeevents.find(
            { participantId: job.data.participantId, type: 'fixation' },
            {
              fields: {
                _id: 1,
                timestamp: 1,
                datafileId: 1,
                stimulusId: 1,
                aoiId: 1,
                x: 1,
                y: 1,
                eventIndex: 1,
                duration: 1,
              },
              sort: { datafileId: 1, stimulusId: 1, eventIndex: 1 },
            },
          ).fetch();
        }

        try {
          analysis.makeVisits({
            participantId: job.data.participantId,
            fixations: fixationCache[job.data.participantId],
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
