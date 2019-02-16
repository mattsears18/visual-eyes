Template.NewStimulus.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('stimulusfiles.all');
  });
});

Template.NewStimulus.events({
  'click .fa-close': function() {
    Session.set('newStimulus', false);
  }
});

AutoForm.hooks({
  insertStimulusForm: {
    onSuccess: function(formType, result) {
      // studyId = FlowRouter.getParam('studyId');
      // FlowRouter.go('/studies/' + studyId + '/stimuli/' + result);
      Session.set('newStimulus', false);
    },
    onError: function(formType, error) {
      console.log(error);
    },
  }
});
