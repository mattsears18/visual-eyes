import Jobs from '../../../collections/Jobs/Jobs';
import Analyses from '../../../collections/Analyses/Analyses';

export default (queueAnalysesMakeGlanceJobs = Jobs.processJobs(
  'analyses.makeGlanceJobs',
  { concurrency: 1 },
  (job, callback) => {
    console.log('worker: analyses.makeGlanceJobs()');

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
        Analyses.update(
          { _id: analysis._id },
          {
            $unset: {
              glanceCount: 1,
              status: 1,
              glanceDurationMean: 1,
              glanceDurationMedian: 1,
            },
          },
        );

        try {
          Meteor.call(
            'analyses.removeGlances',
            { analysisId: analysis._id },
            (err) => {
              if (err) {
                console.log(err);
              }
            },
          );
          Meteor.call(
            'analyses.removeJobs',
            { analysisId: analysis._id },
            (err) => {
              if (err) {
                console.log(err);
              }
            },
          );
        } catch (err) {
          // console.log(err);
        }

        if (analysis.type === null) {
          analysis.type = 'custom';
          Analyses.update({ _id: this._id }, { $set: { type: 'custom' } });
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

          const stimulusId = null;

          if (analysis.type === 'iso15007') {
            makeJob({
              analysisId: analysis._id,
              participantId,
              stimulusId,
            });
          } else {
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

              makeJob({
                analysisId: analysis._id,
                participantId,
                stimulusId,
              });
            });
          }
        });

        job.done();

        const jobCount = Jobs.find({
          type: 'analyses.makeGlances',
          'data.analysisId': analysis._id,
        }).count();

        const analyses = Analyses.find({ studyId: analysis.studyId }).fetch();

        const totalJobCount = Jobs.find({
          type: 'analyses.makeGlances',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        const totalJobsJobCount = Jobs.find({
          type: 'analyses.makeGlanceJobs',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        const completedJobsJobCount = Jobs.find({
          type: 'analyses.makeGlanceJobs',
          status: 'completed',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        console.log(
          `makeGlanceJobs job completed, (${completedJobsJobCount} of ${totalJobsJobCount}), made ${jobCount} glanceJobs (${totalJobCount}  total) for studyId: ${
            analysis.studyId
          }`,
        );
      } catch (err) {
        console.log(err);
        job.cancel();
        job.remove();
      }
    }

    callback();
  },
));

function makeJob(args) {
  console.log(
    `make job for analysis._id: ${args.analysisId}, participantId: ${
      args.participantId
    }, stimulusId: ${args.stimulusId}`,
  );
  const job = new Job(Jobs, 'analyses.makeGlances', args);

  job
    .priority('normal')
    .retry({
      retries: Jobs.forever,
      wait: 1000,
      backoff: 'constant', // wait constant amount of time between each retry
    })
    .save();
}
