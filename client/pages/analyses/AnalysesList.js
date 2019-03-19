
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
    Meteor.call('studies.reprocessAnalyses', { studyId: study._id });
  }
});

Template.AnalysesList.destroyed = function(){
  Session.set('newAnalysis', false);
}
