////////////////////////////////////////////////////////////////////////////////
// Drawings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('drawings.all', function() {
  return Drawings.find({});
});

Meteor.publish('drawings.single', function(id) {
  check(id, String);
  return Drawings.find({_id: id});
});

Meteor.publish('drawingsByProject', function(projectId) {
  check(projectId, String);
  return Drawings.find({projectId: projectId});
});
