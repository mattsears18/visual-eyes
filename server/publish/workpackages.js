////////////////////////////////////////////////////////////////////////////////
// Workpackages Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('workpackages.all', function() {
  return Workpackages.find({});
});

Meteor.publish('workpackages.single', function(id) {
  check(id, String);
  return Workpackages.find({_id: id});
});

Meteor.publish('workpackagesByProject', function(projectId) {
  check(projectId, String);
  return Workpackages.find({projectId: projectId});
});
