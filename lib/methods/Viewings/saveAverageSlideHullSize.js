import Jobs from '../../../collections/Jobs/Jobs';
import getAverageHullSize from './getAverageHullSize';

Meteor.methods({
  'viewings.saveAverageSlideHullSize'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);

      var job = Jobs.getJob(jobId);

      Meteor.call('viewings.getSlideHulls', { viewingId: job.data.viewingId}, function(err, slideHulls) {
        if(err) {
          console.log(err);
          job.fail(err);
          callback();
        } else {
          Viewings.update({ _id: job.data.viewingId }, { $set: {
            averageSlideHullSize: getAverageHullSize(slideHulls),
          }}, function(err, num) {
            if(err) {
              console.log(err.error);
              job.fail();
              callback();
            } else {
              job.done();
              callback();
            }
          });
        }
      });
    }
  },
});
