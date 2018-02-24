Template.Workpackage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var workpackageId = FlowRouter.getParam('workpackageId');
    self.subscribe('workpackages.single', workpackageId);

    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('projects.single', projectId);
  });
});

Template.Workpackage.helpers({
  workpackage: () => {
    return Workpackages.findOne();
  },
  project: () => {
    return Projects.findOne();
  },
});

Template.Workpackage.events({
  'click .update-workpackage': function() {
    Session.set('updateWorkpackage', true);
  }
});

Template.Workpackage.destroyed = function(){
  Session.set('updateWorkpackage', false);
}
