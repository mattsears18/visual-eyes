Template.Analysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var analysisId = FlowRouter.getParam('analysisId');
    analysis = Analyses.findOne(analysisId);
    // if(!analysis) { FlowRouter.go('/studies/' + studyId); }

    self.subscribe('analyses.single', analysisId);
    self.subscribe('viewings.byAnalysisId', analysisId);
    self.subscribe('datafiles.byAnalysisId', analysisId);
    self.subscribe('aois.byAnalysisId', analysisId);
  });
});

Template.BreadCrumbs.helpers({
  analysis: () => {
    return Analyses.findOne();
  },
});

Template.Analysis.helpers({
  selector() {
    return {analysisId: FlowRouter.getParam('analysisId')};
  },
  analysis: () => {
    return Analyses.findOne();
  },
  viewings: () => {
    return Viewings.find();
  },
  study: () => {
    return Studies.findOne();
  },
  aois: () => {
    return Aois.find();
  },
  datafiles: () => {
    return Datafiles.find();
  },

});

Template.Analysis.events({
  'click .update-analysis': function() {
    Session.set('updateAnalysis', true);
  }
});

Template.Analysis.destroyed = function(){
  Session.set('updateAnalysis', false);
}
