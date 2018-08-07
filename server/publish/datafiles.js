////////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('files.datafiles.all', () => {
  return Datafiles.find({}).cursor;
});

Meteor.publish('files.datafiles.byStudyId', (studyId) => {
  check(studyId, String);
  study = Studies.findOne(studyId);
  return Datafiles.find({ _id: { $in: study.datafileIds }}).cursor;
});

Meteor.publish('files.datafiles.byRecordingId', function(recordingId) {
  check(recordingId, String);
  recording = Recordings.findOne({_id: recordingId});
  return Datafiles.find({_id: recording.datafileId}).cursor;
});

Meteor.publish('files.datafiles.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Datafiles.find({_id: viewing.datafileId}).cursor;
});

Meteor.publish('files.datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({_id: id});
});
