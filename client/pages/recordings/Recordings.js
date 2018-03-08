Template.Recordings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('recordings.byStudyId', studyId);
    self.subscribe('studies.single', studyId);
  });
});

Template.Recordings.helpers({
  recordings: () => {
    return Recordings.find();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.Recordings.events({
  'click .new-recording': function() {
    Session.set('newRecording', true);
  }
});

Template.Recordings.destroyed = function(){
  Session.set('newRecording', false);
}
