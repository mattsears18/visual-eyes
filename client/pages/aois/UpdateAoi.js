Template.UpdateAoi.onCreated(function() {
  var self = this;
  self.autorun(function() {
    studyId = FlowRouter.getParam('studyId');
    self.subscribe('stimuli.byStudyId', studyId);
  });
});

Template.UpdateAoi.events({
  'click .fa-close': function() {
    Session.set('updateAoi', false);
  }
});

AutoForm.hooks({
  updateAoiForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAoi', false);
    },
  }
});

Template.UpdateAoi.helpers({
  deleteBeforeRemove: function() {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId + '/stimuli');
        this.remove();
      }
    };
  },
});
