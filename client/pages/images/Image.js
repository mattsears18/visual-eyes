Template.Image.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var imageId = FlowRouter.getParam('imageId');
    self.subscribe('images.single', imageId);
    self.subscribe('imagefiles.byImageId', imageId);
  });
});

Template.Image.helpers({
  image: () => {
    return Images.findOne();
  },
  imagefile: () => {
    return Imagefiles.collection.findOne({});
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  image: () => {
    return Images.findOne();
  },
});

Template.Image.events({
  'click .update-image': function() {
    Session.set('updateImage', true);
  }
});

Template.Image.destroyed = function(){
  Session.set('updateImage', false);
}
