import Jobs from '../../Jobs/Jobs';

export default function makeGazeJobsJob() {
  console.log(`analysis.makeGazeJobsJob() analysisId: ${this._id}`);

  const job = new Job(Jobs, 'analyses.makeGazeJobs', {
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
