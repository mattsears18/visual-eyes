Template.Recordings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    // self.subscribe('recordings.byStudyId', studyId);
    self.subscribe('studies.single', studyId);
    self.subscribe('files.datafiles.byStudyId', studyId);
  });
});

Template.Recordings.helpers({
  study: () => {
    return Studies.findOne();
  },
  selector() {
    return {studyId: FlowRouter.getParam('studyId')};
  },
});
