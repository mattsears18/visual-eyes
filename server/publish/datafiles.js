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

Meteor.publish('datafiles.byVisitId', function(visitId) {
  check(visitId, String);
  const visit = Visits.findOne({ _id: visitId });
  return Datafiles.find({ _id: visit.datafileId }).cursor;
});

Meteor.publish('datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({ _id: id }).cursor;
});
