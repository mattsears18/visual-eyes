import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.makeParticipantJobs'({ analysisId }) {
    //TODO makeViewJobs();
    //TODO makeMetricJobs();
    // console.log('analyses.makeParticipantJobs');
    // console.log('analysisId: ' + analysisId);

    analysis = Analyses.findOne(analysisId);

    analysis.participantIds.forEach(function(participantId) {
      analysis.aoiIds.forEach(function(aoiId) {
        // console.log('make job for analysisId: ' + analysis._id + ', participantId: ' + participantId + ', aoiId: ' + aoiId);

        var job = new Job(Jobs, 'analyses.makeViewings',
          {
            analysisId: analysis._id,
            participantId: participantId,
            aoiId: aoiId,
          }
        );

        job.priority('normal')
          .retry({
            retries: Jobs.forever,   // Retry 5 times,
            wait: 5*1000,  // waiting 5 seconds between attempts
            backoff: 'constant'  // wait constant amount of time between each retry
          })
          .save();
      });
    });
  },
});
