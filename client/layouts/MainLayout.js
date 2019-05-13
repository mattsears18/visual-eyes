Template.MainLayout.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    if (studyId) {
      self.subscribe('studies.single', studyId);
    }
  });
});
