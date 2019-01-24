Template.Participant.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('variables.byStudyId', studyId);

    var participantId = FlowRouter.getParam('participantId');
    self.subscribe('participants.single', participantId);
  });
});

Template.Participant.helpers({
  participant: () => {
    return Participants.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
  analyses: () => {
    return Analyses.find();
  },
  // variables: () => {
  //   return Variables.find();
  // }
});

Template.BreadCrumbs.helpers({
  participant: () => {
    return Participants.findOne();
  },
});

Template.Participant.events({
  'click .update-participant': function() {
    Session.set('updateParticipant', true);
  }
});

Template.Participant.destroyed = function(){
  Session.set('updateParticipant', false);
}
