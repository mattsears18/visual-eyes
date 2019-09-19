import Jobs from '../../Jobs/Jobs';

export default function() {
  if (Meteor.isServer) {
    if (!Meteor.isTest) console.log('Analyses.makeVisitJobsJob()');

    Jobs.remove({
      'data.analysisId': this._id,
    });

    const job = new Job(Jobs, 'analyses.makeVisitJobs', {
      analysisId: this._id,
    });

    job
      .priority('critical')
      .retry({
        retries: Jobs.forever,
        wait: 1000,
        backoff: 'constant', // wait constant amount of time between each retry
      })
      .save();
  }
}
