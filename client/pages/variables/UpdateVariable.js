Template.UpdateVariable.events({
  'click .fa-close'() {
    Session.set('updateVariable', false);
  },
});

AutoForm.hooks({
  updateVariableForm: {
    onSuccess(formType, result) {
      Session.set('updateVariable', false);
    },
  },
});

Template.UpdateVariable.helpers({
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        const studyId = FlowRouter.getParam('studyId');
        FlowRouter.go(`/studies/${studyId}/variables`);
        this.remove();
      }
    };
  },
});
