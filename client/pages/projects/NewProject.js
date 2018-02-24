Template.NewProject.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('places.all');
  });
});

Template.NewProject.events({
  'click .fa-close': function() {
    Session.set('newProject', false);
  }
});

AutoForm.hooks({
  insertProjectForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/projects/' + result);
    },
  }
});
