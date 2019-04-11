import Jobs from '../../Jobs/Jobs';

export default function makeHullJobs() {
  let slideJob = new Job(Jobs, 'viewings.saveAverageHullCoverage',
    {
      viewingId: this._id,
      slideStep: 'slide',
    }
  );

  slideJob.priority('normal')
    .retry({
      retries: Jobs.forever,
      wait: 1000,
      backoff: 'constant'
    })
    .save();


  let stepJob = new Job(Jobs, 'viewings.saveAverageHullCoverage',
  {
    viewingId: this._id,
    slideStep: 'step',
  }
  );

  stepJob.priority('normal')
    .retry({
      retries: Jobs.forever,
      wait: 1000,
      backoff: 'constant'
    })
    .save();
}
