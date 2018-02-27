Template.UpdateStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('files.datafiles.all');
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

      Meteor.call('studies.processDatafiles', {
        studyId: FlowRouter.getParam('studyId')
      });
    },
  }
});

Template.UpdateStudy.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/studies');
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
