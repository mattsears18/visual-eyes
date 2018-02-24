Template.Projects.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('projects.all');
  });
});

Template.Projects.helpers({
  projects: () => { return Projects.find(); },
});

Template.Projects.events({
  'click .new-project': function() {
    Session.set('newProject', true);
  }
});

Template.Projects.destroyed = function(){
  Session.set('newProject', false);
}
