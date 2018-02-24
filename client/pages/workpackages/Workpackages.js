Template.Workpackages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('workpackages.all');
  });
});

Template.Workpackages.helpers({
  workpackages: () => { return Workpackages.find(); },
});

Template.BreadCrumbs.helpers({
  workpackage: () => {
    return Workpackages.findOne();
  },
});

Template.Workpackages.events({
  'click .new-workpackage': function() {
    Session.set('newWorkpackage', true);
  }
});

Template.Workpackages.destroyed = function(){
  Session.set('newWorkpackage', false);
}
