Template.UpdateGaze.events({
  'click .fa-close'() {
    Session.set('updateGaze', false);
  },
});

AutoForm.hooks({
  updateGazeForm: {
    onSuccess(formType, result) {
      Session.set('updateGaze', false);
    },
  },
});

Template.UpdateGaze.helpers({
  deleteOnSuccess() {
    return function() {
      FlowRouter.go('/gazes');
    };
  },
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        this.remove();
      }
    };
  },
});
