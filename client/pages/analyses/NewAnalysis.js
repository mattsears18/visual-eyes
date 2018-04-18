Template.NewAnalysis.events({
  'click .fa-close': function() {
    Session.set('newAnalysis', false);
  }
});

AutoForm.hooks({
  insertAnalysisForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/analyses/' + result);
    },
  }
});
