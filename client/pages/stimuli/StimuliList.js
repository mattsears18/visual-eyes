Template.StimuliList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('stimuli.byStudyId', studyId);
    }
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

Template.StimuliList.events({
  'click .new-stimulus': function() {
    Session.set('newStimulus', true);
  }
});

Template.StimuliList.destroyed = function(){
  Session.set('newStimulus', false);
}
