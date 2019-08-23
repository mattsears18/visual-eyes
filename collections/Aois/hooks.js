Aois.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Aois.after.remove(function(userId, aoi) {
  if (Meteor.isServer) {
    Gazepoints.remove({ aoiId: aoi._id });
    Visits.update(
      { studyId: aoi.studyId },
      { $pull: { aoiIds: aoi._id } },
      { multi: true },
    );
  }
});

Aois.after.update(function(userId, doc) {
  if (!doc.datafileIds || !doc.datafileIds.length) {
    console.log(`delete AOI! ${doc._id}`);
    Aois.remove({ _id: doc._id });
  }
});
