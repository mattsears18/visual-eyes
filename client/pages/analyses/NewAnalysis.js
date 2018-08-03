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
    onError: function(formType, error) {
      console.log(error);
    },
  }
});

Template.NewAnalysis.helpers({
  aoiOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    aois = Aois.find({ studyId: studyId }).fetch();
    return aois.map(function(aoi) {
      return {label: aoi.name, value: aoi._id, checked: 'checked'};
    });
  }
});
