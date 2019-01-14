////////////////////////////////////////////////////////////////////////////////
// Images Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('images.all', () => {
  return Images.find({});
});

Meteor.publish('images.single', function(id) {
  check(id, String);
  return Images.find({_id: id});
});

Meteor.publish('images.byStudyId', (studyId) => {
  check(studyId, String);
  return Images.find({ studyId: studyId });
});

Meteor.publish('images.byAoiId', function(aoiId) {
  check(aoiId, String);
  aoi = Aois.findOne({_id: aoiId});
  return Images.find({_id: aoi.imageId});
});

Meteor.publish('images.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Images.find({_id: viewing.aoi().imageId});
});
