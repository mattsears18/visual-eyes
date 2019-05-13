Template.Participant.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('variables.byStudyId', studyId);

    const participantId = FlowRouter.getParam('participantId');
    self.subscribe('participants.single', participantId);
  });
});

Template.Participant.helpers({
  participant: () => Participants.findOne(),
  study: () => Studies.findOne(),
  analyses: () => Analyses.find(),
  // variables: () => {
  //   return Variables.find();
  // }
});

Template.BreadCrumbs.helpers({
  participant: () => Participants.findOne(),
});

Template.Participant.events({
  'click .update-participant'() {
    Session.set('updateParticipant', true);
  },
});

Template.Participant.destroyed = function() {
  Session.set('updateParticipant', false);
};
