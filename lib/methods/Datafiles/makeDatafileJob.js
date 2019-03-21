import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'datafiles.makeDatafileJob'({ datafileId }) {
    var job = new Job(Jobs, 'datafiles.process',
      { datafileId: datafileId }
    );

    job.priority('normal')
      .retry({
        // retries: Jobs.forever,   // Retry 5 times,
        wait: 3*1000,  // waiting 3 seconds between attempts
        // backoff: 'constant',  // wait constant amount of time between each retry
      })
      // .delay(10000)
      .save();
  },
});
