Template.Generics.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('generics.all');
  });
});

Template.Generics.helpers({
  generics: () => { return Generics.find(); },
});

Template.BreadCrumbs.helpers({
  generic: () => {
    return Generics.findOne();
  },
});

Template.Generics.events({
  'click .new-generic': function() {
    Session.set('newGeneric', true);
  }
});

Template.Generics.destroyed = function(){
  Session.set('newGeneric', false);
}
