import Jobs from '../../../collections/Jobs/Jobs';
import { jStat } from 'jStat';

Meteor.methods({
  'viewings.saveAverageSlideHullArea'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);

      let job = Jobs.getJob(jobId);
      if(!job) {
        console.log('job not found!');
        console.log('jodId: ' + jobId);
        return;
      }

      console.log('viewings.saveAverageSlideHullArea ' + job.data.viewingId);

      let viewing = Viewings.findOne({ _id: job.data.viewingId });
      let avg = 0;

      if(viewing) {
        let areaDurations = viewing.plotHulls().getHulls().map(hull => hull.areaDuration());
        let durations = viewing.plotHulls().getHulls().map(hull => hull.duration());

        if(jStat.sum(durations) > 0) {
          avg = jStat.sum(areaDurations) / jStat.sum(durations);
        }

        console.log('average Slide hull area: ' + avg);

        job.done((err, result) => {
          Viewings.update({ _id: job.data.viewingId }, { $set: {
            averageSlideHullArea: avg,
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
