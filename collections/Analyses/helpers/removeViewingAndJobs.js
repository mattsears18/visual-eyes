import Jobs from '../../Jobs/Jobs';

export default function removeViewingsAndJobs() {
  // console.log('analysis.removeViewingAndJobs() analysisId: ' + this._id);

  let viewings = Viewings.find({ analysisId: this._id });
  viewings.forEach(viewing => {
    Viewings.remove({ _id: viewing._id });
  });

  let jobDocs = Jobs.find({ 'data.analysisId':  this._id });

  jobDocs.forEach((jobDoc) => {
    Jobs.getJob(jobDoc._id,
      function (err, job) {
        if (job) {
          job.remove();
        }
      }
    );
  });
}
