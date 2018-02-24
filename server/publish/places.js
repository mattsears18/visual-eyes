////////////////////////////////////////////////////////////////////////////////
// Places Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('places.all', function() {
  return Places.find({});
});

Meteor.publish('places.single', function(id) {
  check(id, String);
  return Places.find({_id: id});
});

Meteor.publish('placesByCompany', function(companyId) {
  check(companyId, String);
  return Places.find({ownerId: companyId});
});
