Template.NewVariable.events({
  'click .fa-close': function() {
    Session.set('newVariable', false);
  }
});

AutoForm.hooks({
  insertVariableForm: {
    onSuccess: function(formType, result) {
      Session.set('newVariable', false);
    },
    onError: function(formType, error) {
      console.log(error);
    },
  }
});
