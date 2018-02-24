Template.NewPlace.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('companies.all');
  });
});

Template.NewPlace.events({
  'click .fa-close': function() {
    Session.set('newPlace', false);
  }
});

AutoForm.hooks({
  insertPlaceForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/places/' + result);
    },
  }
});
