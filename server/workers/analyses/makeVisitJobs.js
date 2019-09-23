import Jobs from '../../../collections/Jobs/Jobs';
import Analyses from '../../../collections/Analyses/Analyses';
import Participants from '../../../collections/Participants/Participants';

export default queueAnalysesMakeVisitJobs = Jobs.processJobs(
  'analyses.makeVisitJobs',
  { concurrency: 1 },
  (analysisVisitJob, callback) => {
    console.log('worker: analyses.makeVisitJobs()');

    const analysis = Analyses.findOne({
      _id: analysisVisitJob.data.analysisId,
    });

    if (!analysis) {
      console.log(
        `Analysis not found. analysisId: ${analysisVisitJob.data.analysisId} Remove all jobs for this analysis.`,
      );

      Jobs.remove({ 'data.analysisId': analysisVisitJob.data.analysisId });
    } else {
      try {
        Analyses.update(
          { _id: analysis._id },
          {
            $unset: {
              visitCount: 1,
              visitDurationMean: 1,
              visitDurationMedian: 1,
            },
            $set: { status: 'needsProcessing' },
          },
        );

        try {
          Meteor.call(
            'analyses.removeVisits',
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
          console.log(err);
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

          console.log(
            `make job for analysis._id: ${analysis._id}, participantId: ${participantId}`,
          );

          const participantVisitJob = new Job(Jobs, 'analyses.makeVisits', {
            analysisId: analysis._id,
            participantId,
          });

          participantVisitJob
            .priority('normal')
            .retry({
              retries: Jobs.forever,
              wait: 1000,
              backoff: 'constant', // wait constant amount of time between each retry
            })
            .save();
        });

        analysisVisitJob.done();

        const jobCount = Jobs.find({
          type: 'analyses.makeVisits',
          'data.analysisId': analysis._id,
        }).count();

        const analyses = Analyses.find({ studyId: analysis.studyId }).fetch();

        const totalJobCount = Jobs.find({
          type: 'analyses.makeVisits',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        const totalJobsJobCount = Jobs.find({
          type: 'analyses.makeVisitJobs',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        const completedJobsJobCount = Jobs.find({
          type: 'analyses.makeVisitJobs',
          status: 'completed',
          'data.analysisId': { $in: analyses.map(a => a._id) },
        }).count();

        console.log(
          `makeVisitJobs job completed, (${completedJobsJobCount} of ${totalJobsJobCount}), made ${jobCount} visitJobs (${totalJobCount}  total) for studyId: ${analysis.studyId}`,
        );
      } catch (err) {
        console.log(err);
        analysisVisitJob.cancel();
        analysisVisitJob.remove();
      }
    }

    callback();
  },
);
