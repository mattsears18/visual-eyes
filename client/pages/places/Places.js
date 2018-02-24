Template.Places.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('places.all');
  });
});

Template.Places.helpers({
  places: () => { return Places.find(); },
});

Template.Places.events({
  'click .new-place': function() {
    Session.set('newPlace', true);
  }
});

Template.Places.destroyed = function(){
  Session.set('newPlace', false);
}
