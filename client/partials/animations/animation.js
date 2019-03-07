Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    viewingId = FlowRouter.getParam('viewingId');

    if(viewingId) {
      self.subscribe('stimuli.byViewingId', viewingId);
      self.subscribe('stimulusfiles.byViewingId', viewingId);
    }
  });
});

Template.Animation.helpers({
  stimulus: () => { return Stimuli.findOne(); },
});
