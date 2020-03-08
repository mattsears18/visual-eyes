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

Visits.after.insert(function(userId, doc) {
  const visit = Visits.findOne({ _id: doc._id });

  if (visit && visit.getFixations().count()) {
    Visits.update(
      { _id: visit._id },
      { $set: { coverage: visit.getCoverage() } },
    );
  }
});
