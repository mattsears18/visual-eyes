Template.NewStimulus.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('stimulusfiles.all');
  });
});

Template.NewStimulus.events({
  'click .fa-close'() {
    Session.set('newStimulus', false);
  },
});

AutoForm.hooks({
  insertStimulusForm: {
    onSuccess(formType, result) {
      // studyId = FlowRouter.getParam('studyId');
      // FlowRouter.go('/studies/' + studyId + '/stimuli/' + result);
      Session.set('newStimulus', false);
    },
    onError(formType, error) {
      console.log(error);
    },
  },
});
