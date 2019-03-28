import Jobs from '../../../collections/Jobs/Jobs';
import { jStat } from 'jStat';

Meteor.methods({
  'viewings.saveAverageSlideHullCoverage'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);

      let job = Jobs.getJob(jobId);
      if(!job) {
        console.log('job not found!');
        console.log('jodId: ' + jobId);
        return;
      }

      console.log('viewings.saveAverageSlideHullCoverage ' + job.data.viewingId);

      let viewing = Viewings.findOne({ _id: job.data.viewingId });
      let avg = 0;

      if(viewing) {
        let coverageDurations = viewing.plotHulls().getHulls().map(hull => hull.coverageDuration());
        let durations = viewing.plotHulls().getHulls().map(hull => hull.duration());

        if(jStat.sum(durations) > 0) {
          avg = jStat.sum(coverageDurations) / jStat.sum(durations);
        }

        console.log('average slide hull coverage: ' + avg);

        job.done((err, result) => {
          Viewings.update({ _id: job.data.viewingId }, { $set: {
            averageSlideHullCoverage: avg,
            status: 'processed',
          }});
        });
      } else {
        console.log('no viewing found');
        job.done();
      }
      callback();
    }
  },
});
