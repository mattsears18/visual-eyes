////////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('datafiles.all', () => {
  return Datafiles.find({},
    { sort: { name: 1 }}).cursor;
});

Meteor.publish('datafiles.byStudyId', (studyId) => {
  check(studyId, String);
  study = Studies.findOne(studyId);

  if(study) {
    //TODO use .observeChanges() to show new datafiles on study.html after updateStudy form is submitted
    return Datafiles.find({ studyId: study._id },
      { sort: { name: 1 }}).cursor;
  }
});

Meteor.publish('datafiles.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Datafiles.find({_id: viewing.datafileId}).cursor;
});

Meteor.publish('datafiles.single', function(id) {
  check(id, String);
  return Datafiles.find({_id: id}).cursor;
});

Meteor.publish('datafiles.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({_id: analysisId});
  return Datafiles.find({ _id: { $in: analysis.datafileIds }},
    { sort: { name: 1 }}).cursor;
});
