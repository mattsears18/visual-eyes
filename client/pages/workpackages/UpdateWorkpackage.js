Template.UpdateWorkpackage.events({
  'click .fa-close': function() {
    Session.set('updateWorkpackage', false);
  }
});

AutoForm.hooks({
  updateWorkpackageForm: {
    onSuccess: function(formType, result) {
      Session.set('updateWorkpackage', false);
    },
  }
});

Template.UpdateWorkpackage.helpers({
  deleteOnSuccess: function() {
    return function() {
      projectId = FlowRouter.getParam('projectId');
      FlowRouter.go('/projects/' + projectId);
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
