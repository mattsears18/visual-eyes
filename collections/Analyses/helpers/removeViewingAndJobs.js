import Jobs from '../../Jobs/Jobs';

export default function removeViewingsAndJobs() {
  // console.log('analysis.removeViewingAndJobs() analysisId: ' + this._id);

  let viewings = Viewings.find({ analysisId: this._id });
  viewings.forEach(viewing => {
    Viewings.remove({ _id: viewing._id });
  });

  let jobs = Jobs.find({ type: 'analyses.makeViewings', 'data.analysisId':  this._id });
  jobs.forEach(job => {
    Jobs.remove({ _id: job._id });
  });
}
