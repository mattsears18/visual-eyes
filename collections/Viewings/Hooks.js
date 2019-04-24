import Jobs from '../Jobs/Jobs';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

Viewings.after.remove(function(userId, viewing) {
  if(Meteor.isServer) {
    Jobs.remove({ 'data.viewingId': viewing._id });
  }
});
