
Template.AnalysesList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('viewings.byStudyId', studyId);
  });
});



Template.AnalysesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  analyses: () => {
    return Analyses.find({}, { sort: { createdAt: -1 }});
  },
});

Template.AnalysesList.events({
  'click .new-analysis': function() {
    Session.set('newAnalysis', true);
  },
  'click .reprocess-analyses': function() {
    let study = Studies.findOne({ _id: FlowRouter.getParam('studyId') });
    study.reprocessAnalyses();
  },
  'click .download-as-csv':function(){
    Meteor.call('studies.saveCSVs', { studyId: FlowRouter.getParam('studyId') });
  },
});

Template.AnalysesList.destroyed = function(){
  Session.set('newAnalysis', false);
}
