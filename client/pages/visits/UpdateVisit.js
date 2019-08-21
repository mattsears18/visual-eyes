Template.UpdateVisit.events({
  'click .fa-close'() {
    Session.set('updateVisit', false);
  },
});

AutoForm.hooks({
  updateVisitForm: {
    onSuccess(formType, result) {
      Session.set('updateVisit', false);
    },
  },
});

Template.UpdateVisit.helpers({
  deleteOnSuccess() {
    return function() {
      FlowRouter.go('/visits');
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
