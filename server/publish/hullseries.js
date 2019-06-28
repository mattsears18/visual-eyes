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

Meteor.publish('hullseries.byGlanceId', (glanceId) => {
  check(glanceId, String);
  return Hullseries.find({ glanceId });
});
