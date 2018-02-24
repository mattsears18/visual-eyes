Template.NewGeneric.events({
  'click .fa-close': function() {
    Session.set('newGeneric', false);
  }
});

AutoForm.hooks({
  insertGenericForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/generics/' + result);
    },
  }
});
