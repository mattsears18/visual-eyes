Template.UpdateRecording.events({
  'click .fa-close': function() {
    Session.set('updateRecording', false);
  }
});

AutoForm.hooks({
  updateRecordingForm: {
    onSuccess: function(formType, result) {
      Session.set('updateRecording', false);
    },
  }
});

Template.UpdateRecording.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/recordings');
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
