Template.UpdateViewing.events({
  'click .fa-close': function() {
    Session.set('updateViewing', false);
  }
});

AutoForm.hooks({
  updateViewingForm: {
    onSuccess: function(formType, result) {
      Session.set('updateViewing', false);
    },
  }
});

Template.UpdateViewing.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/viewings');
    }
  },
  deleteBeforeRemove: function() {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
