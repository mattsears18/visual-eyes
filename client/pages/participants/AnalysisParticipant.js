Template.AnalysisParticipant.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var analysisId = FlowRouter.getParam('analysisId');
    self.subscribe('analyses.single', analysisId);

    var participantId = FlowRouter.getParam('participantId');
    self.subscribe('participants.single', participantId);
    self.subscribe('analyses.byParticipantId', participantId);
  });
});

Template.AnalysisParticipant.helpers({
  participant: () => {
    return Participants.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
  analysis: () => {
    return Analyses.findOne();
  },
});

Template.BreadCrumbs.helpers({
  participant: () => {
    return Participants.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
  analysis: () => {
    return Analyses.findOne();
  },
});
