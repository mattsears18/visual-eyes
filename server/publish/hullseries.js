// //////////////////////////////////////////////////////////////////////////////
// Hullseries Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('hullseries.all', function() {
  return Hullseries.find({});
});

Meteor.publish('hullseries.single', function(id) {
  check(id, String);
  return Hullseries.find({ _id: id });
});

Meteor.publish('hullseries.byVisitId', (visitId) => {
  check(visitId, String);
  return Hullseries.find({ visitId });
});
