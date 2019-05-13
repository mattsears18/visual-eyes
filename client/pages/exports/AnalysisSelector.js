Template.AnalysisSelector.onCreated(function() {
  this.autorun(() => {
    const studyId = FlowRouter.getParam('studyId');
    this.subscribe('analyses.byStudyId', studyId);
  });
});

Template.AnalysisSelector.helpers({
  analyses: () => Analyses.find(),
});
