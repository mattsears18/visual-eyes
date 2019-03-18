import Jobs from '../../../collections/Jobs/Jobs';
import { jStat } from 'jStat';

Meteor.methods({
  'viewings.saveAverageSlideHullSize'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);

      let job = Jobs.getJob(jobId);
      console.log('viewings.saveAverageSlideHullSize ' + job.data.viewingId);

      let viewing = Viewings.findOne({ _id: job.data.viewingId });
      let avg = 0;

      if(viewing) {
        slideHulls = viewing.getSlideHulls();

        timeAreas = slideHulls.map(hull => hull.area() * hull.timeStep());
        times = slideHulls.map(hull => hull.timeStep());

        if(jStat.sum(times) > 0) {
          avg = jStat.sum(timeAreas) / jStat.sum(times);
        }

        console.log('average Slide hull size: ' + avg);

        job.done((err, result) => {
          Viewings.update({ _id: job.data.viewingId }, { $set: {
            averageSlideHullSize: avg,
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
