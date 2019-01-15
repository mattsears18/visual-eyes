Template.UpdateImage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('imagefiles.all');
  });
});

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
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId);
        this.remove();
      }
    };
  },
});
