Template.AoisList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      // self.subscribe('aois.byStudyId', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
    }
  });
});

Template.AoisList.helpers({
  study: () => {
    return Studies.findOne();
  },
  aois: () => {
    return Aois.find({}, { sort: { name: 1 }});
  },
});
