import Jobs from '../../Jobs/Jobs';

export default function makeHullJobs() {
  let slideJob = new Job(Jobs, 'viewings.saveAverageHullCoverage',
    {
      viewingId: this._id,
      analysisId: this.analysisId,
      slideStep: 'slide',
      instantContinuous: 'instantaneous',
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
    analysisId: this.analysisId,
    slideStep: 'step',
    instantContinuous: 'instantaneous',
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
