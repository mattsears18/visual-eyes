Template.NewCompany.events({
  'click .fa-close': function() {
    Session.set('newCompany', false);
  }
});

AutoForm.hooks({
  insertCompanyForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/companies/' + result);
    },
  }
});
