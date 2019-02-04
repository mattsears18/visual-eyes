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
  if(viewing && viewing.aoi() && viewing.aoi().image()) {
    return Imagefiles.find({_id: viewing.aoi().image().imagefileId}).cursor;
  }
});
