Template.Studies.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('studies.all');
  });
});

Template.Studies.helpers({
  studies: () => Studies.find({}, { sort: { name: 1 } }),
});

Template.Studies.events({
  'click .new-study'() {
    Session.set('newStudy', true);
  },
});

Template.Studies.destroyed = function() {
  Session.set('newStudy', false);
};
