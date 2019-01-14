import Images from './Images';
var sizeOf = require('image-size');

Images.collection.before.insert(function(userId, doc) {
  var dims = sizeOf(doc.path);
  doc.fileWidth = dims.width;
  doc.fileHeight = dims.height;
});


Images.collection.after.remove(function(userId, image) {
  if(Meteor.isServer) {
    Aois.update({ imageId: image._id }, { $unset: { imageId: "" }});
  }
});
