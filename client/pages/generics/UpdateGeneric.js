Template.UpdateGeneric.events({
  'click .fa-close': function() {
    Session.set('updateGeneric', false);
  }
});

AutoForm.hooks({
  updateGenericForm: {
    onSuccess: function(formType, result) {
      Session.set('updateGeneric', false);
    },
  }
});

Template.UpdateGeneric.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/generics');
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
