// //////////////////////////////////////////////////////////////////////////////
// Variables Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('variables.all', function() {
  return Variables.find({});
});

Meteor.publish('variables.single', function(id) {
  check(id, String);
  return Variables.find({ _id: id });
});

Meteor.publish('variables.byStudyId', (studyId) => {
  check(studyId, String);
  return Variables.find({ studyId }, { sort: { name: 1 } });
});
