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
