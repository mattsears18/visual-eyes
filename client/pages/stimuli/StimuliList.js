Template.StimuliList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('stimulusfiles.byStudyId', studyId);
  });
});

Template.StimuliList.helpers({
  study: () => {
    return Studies.findOne();
  },
  stimuli: () => {
    return Stimuli.find({}, { sort: { name: 1 }});
  },
});
