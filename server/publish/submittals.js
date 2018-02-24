////////////////////////////////////////////////////////////////////////////////
// Submittals Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('submittals.all', function() {
  return Submittals.find({});
});

Meteor.publish('submittals.single', function(id) {
  check(id, String);
  return Submittals.find({_id: id});
});

Meteor.publish('submittalsByProject', function(projectId) {
  check(projectId, String);
  return Submittals.find({projectId: projectId});
});
