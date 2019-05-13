Template.NewViewing.events({
  'click .fa-close'() {
    Session.set('newViewing', false);
  },
});

AutoForm.hooks({
  insertViewingForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/viewings/${result}`);
    },
  },
});
