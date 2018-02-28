Template.Aois.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('aois.all');
  });
});

Template.Aois.helpers({
  aois: () => { return Aois.find(); },
});

Template.BreadCrumbs.helpers({
  aoi: () => {
    return Aois.findOne();
  },
});

Template.Aois.events({
  'click .new-aoi': function() {
    Session.set('newAoi', true);
  }
});

Template.Aois.destroyed = function(){
  Session.set('newAoi', false);
}
