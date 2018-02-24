Template.UpdateSubmittal.events({
  'click .fa-close': function() {
    Session.set('updateSubmittal', false);
  }
});

AutoForm.hooks({
  updateSubmittalForm: {
    onSuccess: function(formType, result) {
      Session.set('updateSubmittal', false);
    },
  }
});

Template.UpdateSubmittal.helpers({
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
