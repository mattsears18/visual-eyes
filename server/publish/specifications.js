////////////////////////////////////////////////////////////////////////////////
// Specifications Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('specifications.all', function() {
  return Specifications.find({});
});

Meteor.publish('specifications.single', function(id) {
  check(id, String);
  return Specifications.find({_id: id});
});

Meteor.publish('specificationsByProject', function(projectId) {
  check(projectId, String);
  return Specifications.find({projectId: projectId});
});
