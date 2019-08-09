Template.StudyLayout.onCreated(function() {
  const self = this;
  let dummy = 0;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');

    self.subscribe('studies.single', studyId);

    study = Studies.findOne(studyId);
    if (study) {
      self.subscribe('datafiles.byStudyId', studyId, dummy++);
      self.subscribe('participants.byStudyId', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
      self.subscribe('variables.byStudyId', studyId);
      self.subscribe('analyses.byStudyId', studyId);
    }
  });
});

Template.StudyLayout.helpers({
  study: () => Studies.findOne(),
  datafiles: () => Datafiles.find(),
  participants: () => Participants.find(),
  stimuli: () => Stimuli.find(),
  stimulusfiles: () => Stimulusfiles.find(),
  variables: () => Variables.find(),
  analyses: () => Analyses.find(),
  analysesProcessedPercent: () => (Analyses.find({ status: 'processed' }).count() / Analyses.find().count())
    * 100,
});

Template.StudyLayout.events({
  'click .update-study'() {
    Session.set('updateStudy', true);
  },
});

Template.StudyLayout.destroyed = function() {
  Session.set('updateStudy', false);
};
