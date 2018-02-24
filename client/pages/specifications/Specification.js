Template.Specification.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var specificationId = FlowRouter.getParam('specificationId');
    self.subscribe('specifications.single', specificationId);

    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('projects.single', projectId);
  });
});

Template.Specification.helpers({
  specification: () => {
    return Specifications.findOne();
  },
  project: () => {
    return Projects.findOne();
  },
});

Template.Specification.events({
  'click .update-specification': function() {
    Session.set('updateSpecification', true);
  }
});

Template.Specification.destroyed = function(){
  Session.set('updateSpecification', false);
}
