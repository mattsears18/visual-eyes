/* eslint-disable no-param-reassign */
import Jobs from '../Jobs/Jobs';

Glances.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Glances.after.remove(function(userId, glance) {
  if (Meteor.isServer) {
    Jobs.remove({ 'data.glanceId': glance._id });
  }
});
