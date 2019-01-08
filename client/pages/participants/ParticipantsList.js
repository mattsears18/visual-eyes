Template.ParticipantsList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('participants.byStudyId', studyId);
    }
  });
});

Template.ParticipantsList.helpers({
  study: () => {
    return Studies.findOne();
  },
  participants: () => {
    return Participants.find({}, { sort: { name: 1 }});
  },
});
