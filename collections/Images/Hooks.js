import Images from './Images';

Images.after.remove(function(userId, image) {
  if(Meteor.isServer) {
    Aois.update({ imageId: image._id }, { $unset: { imageId: "" }});
    Imagefiles.remove({ _id: image.imagefileId });
  }
});
