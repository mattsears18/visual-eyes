import Datafiles from './Datafiles';
import Jobs from '../Jobs/Jobs';

Datafiles.collection.before.insert(function (userId, doc) {
  doc.processed = false;
});

Datafiles.collection.after.remove(function (userId, datafile) {
  // Update Study.datafileIds
  Studies.update(
    { _id: datafile.studyId },
    { $pull: { datafileIds: datafile._id }},
    { multi: true }
  );

  // Update AOI.datafileIds
  Aois.update(
    { studyId: datafile.studyId },
    { $pull: {datafileIds: datafile._id }},
    { multi: true }
  );


  if(Meteor.isServer) {
    Recordings.remove({ datafileId: datafile._id });

    // Delete any AOIs that no longer have datafileIds
    Aois.remove({ datafileIds: {$eq: []} });

    // Delete any Viewings that no longer have datafileIds
    Viewings.remove({ datafileId: datafile._id });

    Jobs.remove({ data: { datafileId: datafile._id }});
  }
});

Datafiles.collection.after.insert(function(userId, datafile) {
  if(Meteor.isServer) {
    Meteor.call('datafiles.makeDatafileJob', {
      datafileId: datafile._id,
    });
  }
});
