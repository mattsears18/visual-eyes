Template.Recordings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recordings.all');
  });
});

Template.Recordings.helpers({
  recordings: () => { return Recordings.find(); },
});

Template.BreadCrumbs.helpers({
  recording: () => {
    return Recordings.findOne();
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
