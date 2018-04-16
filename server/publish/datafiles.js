////////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('files.datafiles.all', () => {
  return Datafiles.find({}).cursor;
});

Meteor.publish('files.datafiles.byStudyId', (studyId) => {
  check(studyId, String);
  return Datafiles.find({ studyId: studyId }).cursor;
});

Meteor.publish('files.datafiles.byRecordingId', function(recordingId) {
  check(recordingId, String);
  recording = Recordings.findOne({_id: recordingId});
  return Datafiles.find({_id: recording.datafileId}).cursor;
});
