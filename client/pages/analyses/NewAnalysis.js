Template.NewAnalysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('participants.byStudyId', studyId);
  });
});

Template.NewAnalysis.events({
  'click .fa-close': function() {
    Session.set('newAnalysis', false);
  }
});

AutoForm.hooks({
  insertAnalysisForm: {
    onSuccess: function(formType, result) {
      studyId = FlowRouter.getParam('studyId');
      FlowRouter.go('/studies/' + studyId + '/analyses/' + result);
    },
    onError: function(formType, error) {
      console.log(error);
    },
  }
});

Template.NewAnalysis.helpers({
  participantOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    participants = Participants.find({ studyId: studyId }, { $sort: { name: 1 }}).fetch();
    return participants.map(function(participant) {
      return { label: participant.name, value: participant._id };
    });
  },
  participantIds: function () {
    studyId = FlowRouter.getParam('studyId');
    participants = Participants.find({ studyId: studyId }).fetch();
    ids = participants.map(participant => participant._id);
    return ids.join(',');
  },
  stimulusOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find({ studyId: studyId }, { $sort: { name: 1 }}).fetch();
    return stimuli.map(function(stimulus) {
      return { label: stimulus.name, value: stimulus._id };
    });
  },
  stimulusIds: function () {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find({ studyId: studyId }).fetch();
    ids = stimuli.map(stimulus => stimulus._id);
    return ids.join(',');
  },
});
