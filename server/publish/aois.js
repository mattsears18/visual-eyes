////////////////////////////////////////////////////////////////////////////////
// Aois Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('aois.all', function() {
  return Aois.find({});
});

Meteor.publish('aois.single', function(id) {
  check(id, String);
  return Aois.find({_id: id});
});

Meteor.publish('aois.byStudyId', (studyId) => {
  check(studyId, String);
  return Aois.find({ studyId: studyId });
});

Meteor.publish('aois.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Aois.find({_id: viewing.aoiId});
});
