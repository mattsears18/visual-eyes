Template.Generic.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var genericId = FlowRouter.getParam('genericId');
    self.subscribe('generics.single', genericId);
  });
});

Template.Generic.helpers({
  generic: () => {
    return Generics.findOne();
  },
});

Template.Generic.events({
  'click .update-generic': function() {
    Session.set('updateGeneric', true);
  }
});

Template.Generic.destroyed = function(){
  Session.set('updateGeneric', false);
}
