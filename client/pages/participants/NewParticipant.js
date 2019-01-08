Template.NewParticipant.events({
  'click .fa-close': function() {
    Session.set('newParticipant', false);
  }
});

AutoForm.hooks({
  insertParticipantForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/participants/' + result);
    },
  }
});
