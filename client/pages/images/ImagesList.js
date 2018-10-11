Template.ImagesList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('images.byStudyId', studyId);
    }
  });
});

Template.ImagesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  images: () => {
    return Images.find({}, { sort: { name: 1 }});
  },
});

Template.ImagesList.events({
  'click .new-image': function() {
    Session.set('newImage', true);
  }
});

Template.ImagesList.destroyed = function(){
  Session.set('newImage', false);
}
