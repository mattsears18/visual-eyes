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

Meteor.publish('datafiles.byGlanceId', function(glanceId) {
  check(glanceId, String);
  const glance = Glances.findOne({ _id: glanceId });
  return Datafiles.find({ _id: glance.datafileId }).cursor;
});

Meteor.publish('datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({ _id: id }).cursor;
});
