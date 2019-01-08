////////////////////////////////////////////////////////////////////////////////
// Participants Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('participants.all', function() {
  return Participants.find({});
});

Meteor.publish('participants.single', function(id) {
  check(id, String);
  return Participants.find({_id: id});
});

Meteor.publish('participants.byStudyId', (studyId) => {
  check(studyId, String);
  return Participants.find({ studyId: studyId },
    { sort: { name: 1 }});
});
