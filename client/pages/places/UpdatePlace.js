Template.UpdatePlace.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('companies.all');
  });
});


Template.UpdatePlace.events({
  'click .fa-close': function() {
    Session.set('updatePlace', false);
  }
});

AutoForm.hooks({
  updatePlaceForm: {
    onSuccess: function(formType, result) {
      Session.set('updatePlace', false);
    },
  }
});

Template.UpdatePlace.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/places');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
