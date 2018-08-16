Template.UpdateStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('datafiles.all');
  });
});

Template.UpdateStudy.events({
  'click .fa-close': function() {
    Session.set('updateStudy', false);
  }
});

AutoForm.hooks({
  updateStudyForm: {
    onSuccess: function(formType, result) {
      Session.set('updateStudy', false);
    },
  }
});

Template.UpdateStudy.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        FlowRouter.go('/studies');
        this.remove();
      }
    };
  },
});
