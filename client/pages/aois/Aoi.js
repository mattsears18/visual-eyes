Template.Aoi.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    const aoiId = FlowRouter.getParam('aoiId');

    self.subscribe('aois.single', aoiId);
    self.subscribe('stimuli.byAoiId', aoiId);

    stimulus = Stimuli.findOne({});
    if (stimulus) {
      self.subscribe('stimulusfiles.byStimulusId', stimulus._id);
    }
  });
});

Template.Aoi.helpers({
  aoi: () => Aois.findOne(),
  study: () => Studies.findOne(),
});

Template.BreadCrumbs.helpers({
  aoi: () => Aois.findOne(),
});

Template.Aoi.events({
  'click .update-aoi'() {
    Session.set('updateAoi', true);
  },
});

Template.Aoi.destroyed = function() {
  Session.set('updateAoi', false);
};
