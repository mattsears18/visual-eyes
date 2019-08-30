Aois.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Aois.after.remove(function(userId, aoi) {
  if (Meteor.isServer) {
    Gazepoints.remove({ aoiId: aoi._id });
    Eyeevents.remove({ aoiId: aoi._id });
    Visits.remove({ aoiId: aoi._id });
  }
});

Aois.after.update(function(userId, doc) {
  if (!doc.datafileIds || !doc.datafileIds.length) {
    Aois.remove({ _id: doc._id });
  }
});
