Template.Recording.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var recordingId = FlowRouter.getParam('recordingId');
    self.subscribe('recordings.single', recordingId);
  });
});

Template.Recording.helpers({
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
