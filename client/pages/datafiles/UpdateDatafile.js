Template.UpdateDatafile.events({
  'click .fa-close': function() {
    Session.set('updateDatafile', false);
  }
});

AutoForm.hooks({
  updateDatafileForm: {
    onSuccess: function(formType, result) {
      Session.set('updateDatafile', false);
    },
  }
});

Template.UpdateDatafile.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/datafiles');
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
