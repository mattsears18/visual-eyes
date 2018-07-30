Template.Viewing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    
    var viewingId = FlowRouter.getParam('viewingId');
    self.subscribe('viewings.single', viewingId);
  });
});

Template.Viewing.helpers({
  viewing: () => {
    return Viewings.findOne();
  },
});

Template.Viewing.events({
  'click .update-viewing': function() {
    Session.set('updateViewing', true);
  }
});

Template.Viewing.destroyed = function(){
  Session.set('updateViewing', false);
}
