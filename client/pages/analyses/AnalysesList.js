Template.AnalysesList.onCreated(function() {
  const self = this;

  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    self.subscribe('viewings.byStudyId', studyId);
  });
});

Template.AnalysesList.helpers({
  study: () => Studies.findOne(),
  analyses: () => Analyses.find({}, { sort: { createdAt: -1 } }),
});

Template.AnalysesList.events({
  'click .new-analysis'() {
    Session.set('newAnalysis', true);
  },
  'click .reprocess-analyses'() {
    const study = Studies.findOne({ _id: FlowRouter.getParam('studyId') });
    study.reprocessAnalyses();
  },
  'click .download-as-csv'() {
    const study = Studies.findOne();
    study.saveCSV({
      groupBy: 'analysis',
    });
  },
});

Template.AnalysesList.destroyed = function() {
  Session.set('newAnalysis', false);
};
