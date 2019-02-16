Template.UpdateStimulus.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('stimulusfiles.all');
  });
});

Template.UpdateStimulus.events({
  'click .fa-close': function() {
    Session.set('updateStimulus', false);
  }
});

AutoForm.hooks({
  updateStimulusForm: {
    onSuccess: function(formType, result) {
      Session.set('updateStimulus', false);
    },
  }
});

Template.UpdateStimulus.helpers({
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
