import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'datafiles.makeDatafileJob'({ datafileId }) {
    study = Studies.findOne({ datafileIds: datafileId });

    if(study) {
      Studies.update({ _id: study._id }, { $set: { datafilesProcessed: false, datafilesProcessing: true }});
    }

    var job = new Job(Jobs, 'datafiles.process',
      { datafileId: datafileId, }
    );

    job.priority('normal')
      .retry({
        retries: Jobs.forever,   // Retry 5 times,
        wait: 5*1000,  // waiting 5 seconds between attempts
        backoff: 'constant'  // wait constant amount of time between each retry
      })
      // .delay(10000)
      .save();
  },
});
