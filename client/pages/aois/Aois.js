Template.Aois.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('studies.single', studyId);
  });
});

Template.Aois.helpers({
  aois: () => {
    return Aois.find();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  aoi: () => {
    return Aois.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.Aois.events({
  'click .new-aoi': function() {
    Session.set('newAoi', true);
  }
});

Template.Aois.destroyed = function(){
  Session.set('newAoi', false);
}
