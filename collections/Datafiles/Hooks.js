import Datafiles from './Datafiles';
import Jobs from '../Jobs/Jobs';

Datafiles.collection.before.insert(function (userId, doc) {
  doc.processed = false;
  doc.headersRemoved = false;
  doc.studyId = doc.meta.studyId;
});

Datafiles.collection.after.insert(function (userId, datafile) {
  if(Meteor.isServer) {
    Meteor.call('datafiles.removeHeadersDetectFormat', { datafileId: datafile._id });
    Meteor.call('datafiles.makeDatafileJob', { datafileId: datafile._id });
  }
});

Datafiles.collection.after.remove(function (userId, datafile) {
  // Update Stimuli.datafileIds
  Stimuli.update(
    { studyId: datafile.studyId },
    { $pull: { datafileIds: datafile._id }},
    { multi: true }
  );

  // Update Participant.datafileIds
  Participants.update(
    { studyId: datafile.studyId },
    { $pull: { datafileIds: datafile._id }},
    { multi: true }
  );

  if(Meteor.isServer) {
    // Delete any Stimuli that no longer have datafileIds
    Stimuli.remove({ datafileIds: {$eq: []} });

    // Delete any Participants that no longer have datafileIds
    Participants.remove({ datafileIds: {$eq: []} });

    Jobs.remove({ data: { datafileId: datafile._id }});
  }
});
