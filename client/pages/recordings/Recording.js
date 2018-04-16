Template.Recording.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var recordingId = FlowRouter.getParam('recordingId');
    self.subscribe('recordings.single', recordingId);
    self.subscribe('files.datafiles.byRecordingId', recordingId);

    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
  });
});

Template.Recording.helpers({
  recording: () => {
    return Recordings.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
  datafile: () => {
    return Datafiles.findOne();
  },
});

Template.BreadCrumbs.helpers({
  recording: () => {
    return Recordings.findOne();
  },
});

Template.Recording.events({
  'click .update-recording': function() {
    Session.set('updateRecording', true);
  }
});

Template.Recording.destroyed = function(){
  Session.set('updateRecording', false);
}
