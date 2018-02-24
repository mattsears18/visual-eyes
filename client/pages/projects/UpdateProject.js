Template.UpdateProject.events({
  'click .fa-close': function() {
    Session.set('updateProject', false);
  }
});

AutoForm.hooks({
  updateProjectForm: {
    onSuccess: function(formType, result) {
      Session.set('updateProject', false);
    },
  }
});

Template.UpdateProject.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/projects');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
