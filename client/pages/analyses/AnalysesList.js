Template.AnalysesList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('analyses.byStudyId', studyId);
      self.subscribe('datafiles.byStudyId', studyId);
    }
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
  }
});

Template.AnalysesList.destroyed = function(){
  Session.set('newAnalysis', false);
}
