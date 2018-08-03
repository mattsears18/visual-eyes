Template.Analyses.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('analyses.byStudyId', studyId);
    self.subscribe('aois.byStudyId', studyId);
  });
});

Template.Analyses.helpers({
  analyses: ()  => { return Analyses.find(); },
  study: ()     => { return Studies.findOne(); },
});

Template.Analyses.events({
  'click .new-analysis': function() {
    Session.set('newAnalysis', true);
  }
});

Template.Analyses.destroyed = function(){
  Session.set('newAnalysis', false);
}
