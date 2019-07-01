Template.NewGlance.events({
  'click .fa-close'() {
    Session.set('newGlance', false);
  },
});

AutoForm.hooks({
  insertGlanceForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/glances/${result}`);
    },
  },
});
