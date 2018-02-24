Template.Specifications.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('specifications.all');
  });
});

Template.Specifications.helpers({
  specifications: () => { return Specifications.find(); },
});

Template.BreadCrumbs.helpers({
  specification: () => {
    return Specifications.findOne();
  },
});

Template.Specifications.events({
  'click .new-specification': function() {
    Session.set('newSpecification', true);
  }
});

Template.Specifications.destroyed = function(){
  Session.set('newSpecification', false);
}
