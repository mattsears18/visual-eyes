Template.NewAnalysis.events({
  'click .fa-close'() {
    Session.set('newAnalysis', false);
  },
});

AutoForm.hooks({
  insertAnalysisForm: {
    onSuccess(formType, result) {
      studyId = FlowRouter.getParam('studyId');
      FlowRouter.go(`/studies/${studyId}/analyses/${result}`);
    },
    onError(formType, error) {
      // console.log(error);
    },
  },
});

Template.NewAnalysis.helpers({
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
  participantIds() {
    studyId = FlowRouter.getParam('studyId');
    participants = Participants.find({ studyId }).fetch();
    ids = participants.map(participant => participant._id);
    return ids.join(',');
  },
  stimulusOptions() {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find(
      { studyId },
      { $sort: { name: 1 } },
    ).fetch();
    return stimuli.map(function(stimulus) {
      return { label: stimulus.name, value: stimulus._id };
    });
  },
  stimulusIds() {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find({ studyId }).fetch();
    ids = stimuli.map(stimulus => stimulus._id);
    return ids.join(',');
  },
});
