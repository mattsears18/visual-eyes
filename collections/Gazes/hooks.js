/* eslint-disable no-param-reassign */
import Jobs from '../Jobs/Jobs';

Gazes.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Gazes.after.remove(function(userId, gaze) {
  if (Meteor.isServer) {
    Jobs.remove({ 'data.gazeId': gaze._id });
  }
});
