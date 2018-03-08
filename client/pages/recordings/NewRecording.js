Template.NewRecording.events({
  'click .fa-close': function() {
    Session.set('newRecording', false);
  }
});

AutoForm.hooks({
  insertRecordingForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/recordings/' + result);
    },
  }
});
