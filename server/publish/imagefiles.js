// //////////////////////////////////////////////////////////////////////////////
// Imagefiles Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('imagefiles.all', () => {
  return Imagefiles.collection.find({});
});

Meteor.publish('imagefiles.byImageId', (imageId) => {
  check(imageId, String);
  image = Images.findOne(imageId);

  if(image) {
    return Imagefiles.find({ _id: image.imagefileId }).cursor;
  }
});

Meteor.publish('imagefiles.byAoiId', (aoiId) => {
  check(aoiId, String);
  aoi = Aois.findOne(aoiId);

  if(aoi && aoi.imageId) {
    image = Images.findOne(aoi.imageId)
    if(image) {
      return Imagefiles.find({ _id: image.imagefileId }).cursor;
    }
  }
});

Meteor.publish('imagefiles.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Imagefiles.find({_id: viewing.aoi().image().imagefileId}).cursor;
});


//
// Meteor.publish('imagefiles.single', function(id) {
//   check(id, String);
//   return Imagefiles.find({_id: id}).cursor;
// });
//
// Meteor.publish('imagefiles.byStudyId', (studyId) => {
//   check(studyId, String);
//   study = Studies.findOne(studyId);
//
//   if(study) {
//     //TODO use .observeChanges() to show new datafiles on study.html after updateStudy form is submitted
//     return Imagefiles.find({ _id: { $in: study.imageIds }},
//       { sort: { name: 1 }}).cursor;
//   }
// });
//
// Meteor.publish('imagefiles.byAoiId', function(aoiId) {
//   check(aoiId, String);
//   aoi = Aois.findOne({_id: aoiId});
//   return Imagefiles.find({_id: aoi.imageId}).cursor;
// });
//
// Meteor.publish('imagefiles.byViewingId', function(viewingId) {
//   check(viewingId, String);
//   viewing = Viewings.findOne({_id: viewingId});
//   return Imagefiles.find({_id: viewing.aoi().imageId}).cursor;
// });
