Template.Aoi.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var aoiId = FlowRouter.getParam('aoiId');
    aoi = Aois.findOne(aoiId);

    self.subscribe('aois.single', aoiId);
    self.subscribe('images.byAoiId', aoiId);
  });
});

Template.Aoi.helpers({
  aoi: () => {
    return Aois.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  aoi: () => {
    return Aois.findOne();
  },
});

Template.Aoi.events({
  'click .update-aoi': function() {
    Session.set('updateAoi', true);
  }
});

Template.Aoi.destroyed = function(){
  Session.set('updateAoi', false);
}
