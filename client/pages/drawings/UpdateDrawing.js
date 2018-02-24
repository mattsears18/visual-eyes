Template.UpdateDrawing.events({
  'click .fa-close': function() {
    Session.set('updateDrawing', false);
  }
});

AutoForm.hooks({
  updateDrawingForm: {
    onSuccess: function(formType, result) {
      Session.set('updateDrawing', false);
    },
  }
});

Template.UpdateDrawing.helpers({
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
