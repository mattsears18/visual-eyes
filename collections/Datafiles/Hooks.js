import Jobs from '../Jobs/Jobs';

Datafiles.collection.before.insert(function(userId, doc) {
  if (doc.meta && doc.meta.studyId) {
    doc.studyId = doc.meta.studyId;
  }
});

Datafiles.collection.after.insert(function(userId, doc) {
  if (Meteor.isServer) {
    const datafile = Datafiles.collection.findOne({ _id: doc._id });
    datafile.makeProcessJob();
  }
});

Datafiles.collection.after.remove(function(userId, datafile) {
  // Update Stimuli.datafileIds
  Stimuli.update(
    { studyId: datafile.studyId },
    { $pull: { datafileIds: datafile._id } },
    { multi: true },
  );

  // Update Participant.datafileIds
  Participants.update(
    { studyId: datafile.studyId },
    { $pull: { datafileIds: datafile._id } },
    { multi: true },
  );

  if (Meteor.isServer) {
    // Delete any Stimuli that no longer have datafileIds
    Stimuli.remove({ datafileIds: { $eq: [] } });

    // Delete any Participants that no longer have datafileIds
    Participants.remove({ datafileIds: { $eq: [] } });

    Jobs.remove({ data: { datafileId: datafile._id } });
  }
});
