Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    viewingId = FlowRouter.getParam('viewingId');

    if(viewingId) {
      self.subscribe('viewings.single', viewingId);
      self.subscribe('stimuli.byViewingId', viewingId);
      self.subscribe('stimulusfiles.byViewingId', viewingId);
    }
  });
});

Template.Animation.helpers({
  stimulus: () => { return Stimuli.findOne(); },
});

Template.Animation.events({
  'click .download-hulls-as-csv': (e, template) => {
    Meteor.call('viewings.saveCSV', {
      viewingId: FlowRouter.getParam('viewingId'),
      analysisType: Session.get('analysisType'),
      instantContinuous: Session.get('instantContinuous'),
      slideStep: Session.get('slideStep'),
      centroidPeriod: Session.get('centroidPeriod'),
    });
  },
});
