Template.NewParticipant.events({
  'click .fa-close'() {
    Session.set('newParticipant', false);
  },
});

AutoForm.hooks({
  insertParticipantForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/participants/${result}`);
    },
  },
});
