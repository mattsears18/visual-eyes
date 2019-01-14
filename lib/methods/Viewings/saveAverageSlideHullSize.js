import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'viewings.saveAverageSlideHullSize'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);

      var job = Jobs.getJob(jobId);

      Meteor.call('viewings.getAverageSlideHullSize', { viewingId: job.data.viewingId }, function(err, averageSlideHullSize) {
        if(err) {
          console.log(err.error);
          job.fail();
          callback();
        } else {
          if(averageSlideHullSize) {
            Viewings.update({ _id: job.data.viewingId }, { $set: {
              averageSlideHullSize: averageSlideHullSize,
            }});
          }

          job.done();
          callback();
        }
      });
    }
  },
});
