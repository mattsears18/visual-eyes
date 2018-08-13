Template.Recordings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    // self.subscribe('recordings.byStudyId', studyId);
    // self.subscribe('studies.single', studyId);
    self.subscribe('datafiles.byStudyId', studyId);
  });
});

Template.Recordings.helpers({
  selector() {
    return {studyId: FlowRouter.getParam('studyId')};
  },
});
