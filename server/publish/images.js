////////////////////////////////////////////////////////////////////////////////
// Images Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('images.all', () => {
  return Images.find({}).cursor;
});

Meteor.publish('images.single', function(id) {
  check(id, String);
  return Images.find({_id: id}).cursor;
});

Meteor.publish('images.byStudyId', (studyId) => {
  check(studyId, String);
  study = Studies.findOne(studyId);

  if(study) {
    //TODO use .observeChanges() to show new images on study.html after updateStudy form is submitted
    return Images.find({ _id: { $in: study.imageIds }},
      { sort: { name: 1 }}).cursor;
  }
});

Meteor.publish('images.byAoiId', function(aoiId) {
  check(aoiId, String);
  aoi = Aois.findOne({_id: aoiId});
  return Images.find({_id: aoi.imageId}).cursor;
});

Meteor.publish('images.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Images.find({_id: viewing.aoi().imageId}).cursor;
});
