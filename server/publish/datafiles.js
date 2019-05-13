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

Meteor.publish('datafiles.byViewingId', function(viewingId) {
  check(viewingId, String);
  const viewing = Viewings.findOne({ _id: viewingId });
  return Datafiles.find({ _id: viewing.datafileId }).cursor;
});

Meteor.publish('datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({ _id: id }).cursor;
});

Meteor.publish('datafiles.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({ _id: analysisId });
  return Datafiles.find(
    { _id: { $in: analysis.datafileIds } },
    { sort: { name: 1 } },
  ).cursor;
});
