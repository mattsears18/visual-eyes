Template.Project.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('projects.single', projectId);
    self.subscribe('workpackagesByProject', projectId);
    self.subscribe('submittalsByProject', projectId);
    self.subscribe('drawingsByProject', projectId);
    self.subscribe('specificationsByProject', projectId);

    project = Projects.findOne({});
    if(project) {
      self.subscribe('places.single', project.placeId);

    }
  });
});

Template.Project.helpers({
  project: () => {
    return Projects.findOne();
  },
  workpackages: () => {
    return Workpackages.find();
  },
  submittals: () => {
    return Submittals.find();
  },
  drawings: () => {
    return Drawings.find();
  },
  specifications: () => {
    return Specifications.find();
  },
});

Template.BreadCrumbs.helpers({
  project: () => {
    return Projects.findOne();
  },
});

Template.Project.events({
  'click .update-project': function() {
    Session.set('updateProject', true);
  },
  'click .new-workpackage': function() {
    Session.set('newWorkpackage', true);
  },
  'click .new-submittal': function() {
    Session.set('newSubmittal', true);
  },
  'click .new-drawing': function() {
    Session.set('newDrawing', true);
  },
  'click .new-specification': function() {
    Session.set('newSpecification', true);
  },
});

Template.Project.destroyed = function(){
  Session.set('updateProject', false);
  Session.set('newWorkpackage', false);
  Session.set('newSubmittal', false);
  Session.set('newDrawing', false);
  Session.set('newSpecification', false);
}
