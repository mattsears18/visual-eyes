Template.StudyLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    self.subscribe('studies.single', studyId);
    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('aois.byStudyId', studyId);
      self.subscribe('datafiles.byStudyId', studyId);
      self.subscribe('participants.byStudyId', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
      self.subscribe('variables.byStudyId', studyId);
      self.subscribe('analyses.byStudyId', studyId);
    }
  });
});

Template.StudyLayout.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find();
  },
  participants: () => {
    return Participants.find();
  },
  stimuli: () => {
    return Stimuli.find();
  },
  variables: () => {
    return Variables.find();
  },
  analyses: () => {
    return Analyses.find();
  },
});

Template.StudyLayout.events({
  'click .update-study': function() {
    Session.set('updateStudy', true);
  },
});

Template.StudyLayout.destroyed = function(){
  Session.set('updateStudy', false);
}
