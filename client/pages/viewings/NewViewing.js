Template.NewViewing.events({
  'click .fa-close': function() {
    Session.set('newViewing', false);
  }
});

AutoForm.hooks({
  insertViewingForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/viewings/' + result);
    },
  }
});
