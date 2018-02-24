Template.Drawing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var drawingId = FlowRouter.getParam('drawingId');
    self.subscribe('drawings.single', drawingId);

    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('projects.single', projectId);
  });
});

Template.Drawing.helpers({
  drawing: () => {
    return Drawings.findOne();
  },
  project: () => {
    return Projects.findOne();
  },
});

Template.Drawing.events({
  'click .update-drawing': function() {
    Session.set('updateDrawing', true);
  }
});

Template.Drawing.destroyed = function(){
  Session.set('updateDrawing', false);
}
