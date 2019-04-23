import Jobs from '../Jobs/Jobs';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

// Viewings.after.insert(function(userId, doc) {
//   let viewing = Viewings.findOne({ _id: doc._id });
//   viewing.makeHullJobs();
// });

Viewings.after.remove(function(userId, viewing) {
  if(Meteor.isServer) {
    Jobs.remove({ 'data.viewingId': viewing._id });
  }
});
