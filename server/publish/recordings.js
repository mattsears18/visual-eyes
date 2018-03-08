////////////////////////////////////////////////////////////////////////////////
// Recordings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('recordings.all', function() {
  return Recordings.find({});
});

Meteor.publish('recordings.single', function(id) {
  check(id, String);
  return Recordings.find({_id: id});
});

Meteor.publish('recordings.byStudyId', (studyId) => {
  check(studyId, String);
  return Recordings.find({ studyId: studyId });
});
