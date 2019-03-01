Template.UpdateAnalysis.events({
  'click .fa-close': function() {
    Session.set('updateAnalysis', false);
  }
});

AutoForm.hooks({
  updateAnalysisForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAnalysis', false);
    },
  }
});

Template.UpdateAnalysis.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId + '/analyses');
        this.remove();
      }
    };
  },
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
