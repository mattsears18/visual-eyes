Template.MainLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    if(studyId) {
      self.subscribe('studies.single', studyId);
    }
  });
});
