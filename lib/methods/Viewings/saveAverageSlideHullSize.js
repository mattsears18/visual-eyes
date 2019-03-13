import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'viewings.saveAverageSlideHullSize'({ jobId, callback }) {
    if(Meteor.isServer) {
      check(jobId, String);
      console.log('viewings.saveAverageSlideHullSize');

      var job = Jobs.getJob(jobId);

      Meteor.call('viewings.getAverageSlideHullSize', { viewingId: job.data.viewingId }, function(err, averageSlideHullSize) {
        if(err) {
          console.log(err.error);
          job.fail();
          callback();
        } else {
          console.log('average slide hull size: ' + averageSlideHullSize);
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
