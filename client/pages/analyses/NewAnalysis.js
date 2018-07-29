Template.NewAnalysis.events({
  'click .fa-close': function() {
    Session.set('newAnalysis', false);
  }
});

AutoForm.hooks({
  insertAnalysisForm: {
    onSuccess: function(formType, result) {
      studyId = FlowRouter.getParam('studyId');
      FlowRouter.go('/studies/' + studyId + '/analyses/' + result);

      Meteor.call('analyses.run', {
        analysisId: FlowRouter.getParam('analysisId'),
      });
    },
  }
});
