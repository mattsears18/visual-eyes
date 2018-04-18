Template.Analysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var analysisId = FlowRouter.getParam('analysisId');
    self.subscribe('analyses.single', analysisId);
  });
});

Template.Analysis.helpers({
  analysis: () => {
    return Analyses.findOne();
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
