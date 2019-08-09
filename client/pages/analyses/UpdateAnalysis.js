Template.UpdateAnalysis.onCreated(function() {
  this.showMGGDField = ReactiveVar(false);
});

Template.UpdateAnalysis.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if (study) {
      self.subscribe('participants.byStudyId', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
    }
  });
});

Template.UpdateAnalysis.events({
  'click .fa-close'() {
    Session.set('updateAnalysis', false);
  },
  'change .typeSelector'(event, templateInstance) {
    if (event.target.value === 'custom') {
      templateInstance.showMGGDField.set(true);
    } else {
      templateInstance.showMGGDField.set(false);
    }
  },
});

AutoForm.hooks({
  updateAnalysisForm: {
    onSuccess(formType, result) {
      Session.set('updateAnalysis', false);
    },
  },
});

Template.UpdateAnalysis.helpers({
  deleteBeforeRemove() {
    return function(collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        const studyId = FlowRouter.getParam('studyId');
        FlowRouter.go(`/studies/${studyId}/analyses`);
        this.remove();
      }
    };
  },
  participantOptions() {
    studyId = FlowRouter.getParam('studyId');
    participants = Participants.find(
      { studyId },
      { $sort: { name: 1 } },
    ).fetch();
    return participants.map(function(participant) {
      return { label: participant.name, value: participant._id };
    });
  },
  stimulusOptions() {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find({ studyId }, { $sort: { name: 1 } }).fetch();
    return stimuli.map(function(stimulus) {
      return { label: stimulus.name, value: stimulus._id };
    });
  },
  showMGGDField: () => Template.instance().showMGGDField.get(),
});
