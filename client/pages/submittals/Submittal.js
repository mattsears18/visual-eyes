Template.Submittal.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var submittalId = FlowRouter.getParam('submittalId');
    self.subscribe('submittals.single', submittalId);

    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('projects.single', projectId);
  });
});

Template.Submittal.helpers({
  submittal: () => {
    return Submittals.findOne();
  },
  project: () => {
    return Projects.findOne();
  },
});

Template.Submittal.events({
  'click .update-submittal': function() {
    Session.set('updateSubmittal', true);
  }
});

Template.Submittal.destroyed = function(){
  Session.set('updateSubmittal', false);
}
