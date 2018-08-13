import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.makeDatafileJobs'({ analysisId }) {
    //TODO makeViewJobs();
    //TODO makeMetricJobs();
    console.log('analyses.makeDatafileJobs');
    console.log('analysisId: ' + analysisId);

    analysis = Analyses.findOne(analysisId);

    analysis.datafileIds.forEach(function(datafileId) {
      analysis.aoiIds.forEach(function(aoiId) {
        console.log('make job for analysisId: ' + analysis._id + ', datafileId: ' + datafileId + ', aoiId: ' + aoiId);

        var job = new Job(Jobs, 'analyses.makeViewings',
          {
            analysisId: analysis._id,
            datafileId: datafileId,
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
