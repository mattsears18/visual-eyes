Template.NewVariable.events({
  'click .fa-close'() {
    Session.set('newVariable', false);
  },
});

AutoForm.hooks({
  insertVariableForm: {
    onSuccess(formType, result) {
      Session.set('newVariable', false);
    },
    onError(formType, error) {
      console.log(error);
    },
  },
});
