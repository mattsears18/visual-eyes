Template.Drawings.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('drawings.all');
  });
});

Template.Drawings.helpers({
  drawings: () => { return Drawings.find(); },
});

Template.BreadCrumbs.helpers({
  drawing: () => {
    return Drawings.findOne();
  },
});

Template.Drawings.events({
  'click .new-drawing': function() {
    Session.set('newDrawing', true);
  }
});

Template.Drawings.destroyed = function(){
  Session.set('newDrawing', false);
}
