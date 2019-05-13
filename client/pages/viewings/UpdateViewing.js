Template.UpdateViewing.events({
  'click .fa-close'() {
    Session.set('updateViewing', false);
  },
});

AutoForm.hooks({
  updateViewingForm: {
    onSuccess(formType, result) {
      Session.set('updateViewing', false);
    },
  },
});

Template.UpdateViewing.helpers({
  deleteOnSuccess() {
    return function() {
      FlowRouter.go('/viewings');
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
