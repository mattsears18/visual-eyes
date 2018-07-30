Template.Viewings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('viewings.all');
  });
});

Template.Viewings.helpers({
  viewings: () => { return Viewings.find(); },
});

Template.BreadCrumbs.helpers({
  viewing: () => {
    return Viewings.findOne();
  },
});

Template.Viewings.events({
  'click .new-viewing': function() {
    Session.set('newViewing', true);
  }
});

Template.Viewings.destroyed = function(){
  Session.set('newViewing', false);
}
