Template.AnalysesList.onCreated(function() {
  const self = this;

  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
  });
});

Template.AnalysesList.helpers({
  study: () => Studies.findOne(),
  analyses: () => Analyses.find(),
});

Template.AnalysesList.events({
  'click .new-analysis'() {
    Session.set('newAnalysis', true);
  },
  'click .reprocess-analyses'() {
    Meteor.call('studies.reprocessAnalyses', {
      studyId: FlowRouter.getParam('studyId'),
    });
  },
  'click .download-as-csv'() {
    const study = Studies.findOne();
    study.saveCSV({
      groupBy: 'analysis',
    });
  },
  'click .delete-analysis'(e, template) {
    if (confirm(`Really delete "${e.target.dataset.analysisname}"?`)) {
      Analyses.remove({ _id: e.target.dataset.analysisid });
    }
  },
  'click .make-default-analyses'(e, template) {
    console.log(study.makeDefaultAnalyses());
  },
});

Template.AnalysesList.destroyed = function() {
  Session.set('newAnalysis', false);
};
