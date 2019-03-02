Template.UpdateAnalysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('participants.byStudyId', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
    }
  });
});

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
  stimulusOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    stimuli = Stimuli.find({ studyId: studyId }, { $sort: { name: 1 }}).fetch();
    return stimuli.map(function(stimulus) {
      return { label: stimulus.name, value: stimulus._id };
    });
  },
});
