// //////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish(
  'datafiles.all',
  () => Datafiles.find({}, { sort: { name: 1 } }).cursor,
);

Meteor.publish('datafiles.byStudyId', (studyId) => {
  check(studyId, String);
  const study = Studies.findOne(studyId);

  if (study) {
    return Datafiles.find({ studyId: study._id }, { sort: { name: 1 } }).cursor;
  }
});

Meteor.publish('datafiles.byGazeId', function(gazeId) {
  check(gazeId, String);
  const gaze = Gazes.findOne({ _id: gazeId });
  return Datafiles.find({ _id: gaze.datafileId }).cursor;
});

Meteor.publish('datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({ _id: id }).cursor;
});
