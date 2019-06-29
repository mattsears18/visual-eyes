import Jobs from '../../../collections/Jobs/Jobs';
import Analyses from '../../../collections/Analyses/Analyses';

export default (queueAnalysesMakeGazeJobs = Jobs.processJobs(
  'analyses.makeGazeJobs',
  { concurrency: 1 },
  (job, callback) => {
    const analysis = Analyses.findOne({ _id: job.data.analysisId });
    if (!analysis) {
      console.log(`Analysis not found. analysisId: ${job.data.analysisId}`);
      job.cancel();
      job.remove();
    }

    try {
      Analyses.update(
        { _id: analysis._id },
        { $set: { status: 'processing' }, $unset: { gazeCount: 1 } },
      );

      try {
        Meteor.call('analyses.removeGazes', { analysisId: analysis._id });
        Meteor.call('analyses.removeJobs', { analysisId: analysis._id });
      } catch (err) {
        // console.log(err);
      }

      analysis.participantIds.forEach((participantId) => {
        const participant = Participants.findOne({ _id: participantId });
        if (!participant) {
          console.log(`no participant found: ${participantId}`);
          Analyses.update(
            { _id: analysis._id },
            { $pull: { participantIds: participantId } },
          );
          return;
        }

        analysis.stimulusIds.forEach((stimulusId) => {
          const stimulus = Stimuli.findOne({ _id: stimulusId });
          if (!stimulus) {
            console.log(`no stimulus found: ${stimulusId}`);
            Analyses.update(
              { _id: analysis._id },
              { $pull: { stimulusIds: stimulusId } },
            );
            return;
          }

          // console.log('make job for analysis._id: ' + analysis._id + ', participantId: ' + participantId + ', stimulusId: ' + stimulusId);
          const job = new Job(Jobs, 'analyses.makeGazes', {
            analysisId: analysis._id,
            participantId,
            stimulusId,
          });

          job
            .priority('normal')
            .retry({
              retries: Jobs.forever,
              wait: 1000,
              backoff: 'constant', // wait constant amount of time between each retry
            })
            .save();
        });
      });

      job.done();

      const jobCount = Jobs.find({
        type: 'analyses.makeGazes',
        'data.analysisId': analysis._id,
      }).count();

      const analyses = Analyses.find({ studyId: analysis.studyId }).fetch();

      const totalJobCount = Jobs.find({
        type: 'analyses.makeGazes',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      const totalJobsJobCount = Jobs.find({
        type: 'analyses.makeGazeJobs',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      const completedJobsJobCount = Jobs.find({
        type: 'analyses.makeGazeJobs',
        status: 'completed',
        'data.analysisId': { $in: analyses.map(a => a._id) },
      }).count();

      console.log(
        `makeGazeJobs job completed, (${completedJobsJobCount} of ${totalJobsJobCount}), made ${jobCount} gazeJobs (${totalJobCount}  total) for analysisId: ${
          analysis._id
        }`,
      );
    } catch (err) {
      console.log(err);
      job.cancel();
      job.remove();
    }

    callback();
  },
));
