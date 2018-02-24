Template.Submittals.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('submittals.all');
  });
});

Template.Submittals.helpers({
  submittals: () => { return Submittals.find(); },
});

Template.BreadCrumbs.helpers({
  submittal: () => {
    return Submittals.findOne();
  },
});

Template.Submittals.events({
  'click .new-submittal': function() {
    Session.set('newSubmittal', true);
  }
});

Template.Submittals.destroyed = function(){
  Session.set('newSubmittal', false);
}
