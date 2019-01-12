Template.NewAnalysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('aois.byStudyId', studyId);
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
  aoiOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    aois = Aois.find({ studyId: studyId }, { $sort: { name: 1 }}).fetch();
    return aois.map(function(aoi) {
      return { label: aoi.name, value: aoi._id, checked: 'checked' };
    });
  },
  participantOptions: function () {
    studyId = FlowRouter.getParam('studyId');
    participants = Participants.find({ studyId: studyId }, { $sort: { name: 1 }}).fetch();
    return participants.map(function(participant) {
      return { label: participant.name, value: participant._id, checked: 'checked' };
    });
  }
});
