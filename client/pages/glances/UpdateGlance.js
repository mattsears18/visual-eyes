Template.UpdateGlance.events({
  'click .fa-close'() {
    Session.set('updateGlance', false);
  },
});

AutoForm.hooks({
  updateGlanceForm: {
    onSuccess(formType, result) {
      Session.set('updateGlance', false);
    },
  },
});

Template.UpdateGlance.helpers({
  deleteOnSuccess() {
    return function() {
      FlowRouter.go('/glances');
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
