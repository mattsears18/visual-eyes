Template.UpdateImage.events({
  'click .fa-close': function() {
    Session.set('updateImage', false);
  }
});

AutoForm.hooks({
  updateImageForm: {
    onSuccess: function(formType, result) {
      Session.set('updateImage', false);
    },
  }
});

Template.UpdateImage.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/images');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        FlowRouter.go('/' + collection._name);
        this.remove();
      }
    };
  },
});
