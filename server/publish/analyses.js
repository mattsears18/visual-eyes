////////////////////////////////////////////////////////////////////////////////
// Analyses Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('analyses.all', function() {
  return Analyses.find({});
});

Meteor.publish('analyses.single', function(id) {
  check(id, String);
  return Analyses.find({_id: id});
});

Meteor.publish('analyses.byStudyId', (studyId) => {
  check(studyId, String);
  return Analyses.find({ studyId: studyId });
});
