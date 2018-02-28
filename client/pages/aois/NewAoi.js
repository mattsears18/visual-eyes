Template.NewAoi.events({
  'click .fa-close': function() {
    Session.set('newAoi', false);
  }
});

AutoForm.hooks({
  insertAoiForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/aois/' + result);
    },
  }
});
