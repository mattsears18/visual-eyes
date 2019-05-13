Template.UpdateDatafile.events({
  'click .fa-close'() {
    Session.set('updateDatafile', false);
  },
});

AutoForm.hooks({
  updateDatafileForm: {
    onSuccess(formType, result) {
      Session.set('updateDatafile', false);
    },
  },
});

Template.UpdateDatafile.helpers({
  deleteOnSuccess() {
    return function() {
      FlowRouter.go('/datafiles');
    };
  },
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        FlowRouter.go(`/${collection._name}`);
        this.remove();
      }
    };
  },
});
