/* eslint-disable no-param-reassign */
import Jobs from '../Jobs/Jobs';

Visits.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Visits.after.remove(function(userId, visit) {
  if (Meteor.isServer) {
    Jobs.remove({ 'data.visitId': visit._id });
  }
});
