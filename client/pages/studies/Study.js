Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('files.datafiles.byStudyId', studyId);
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
});

Template.Study.events({
  'click .update-study': function() {
    Session.set('updateStudy', true);
  }
});

Template.Study.destroyed = function(){
  Session.set('updateStudy', false);
}
