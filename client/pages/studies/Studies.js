Template.Studies.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('studies.all');
  });
});

Template.Studies.helpers({
  studies: () => { return Studies.find({}, {sort: {name: 1}}); },
});

Template.Studies.events({
  'click .new-study': function() {
    Session.set('newStudy', true);
  }
});

Template.Studies.destroyed = function(){
  Session.set('newStudy', false);
}
