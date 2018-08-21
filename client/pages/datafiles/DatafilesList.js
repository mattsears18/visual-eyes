Template.DatafilesList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('datafiles.byStudyId', studyId);
    }
  });
});

Template.DatafilesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find({}, { sort: { name: 1 }});
  },
});
