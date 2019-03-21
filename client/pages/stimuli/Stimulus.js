Template.Stimulus.onCreated(function() {
  var self = this;
  var dummy = 0;

  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var stimulusId = FlowRouter.getParam('stimulusId');

    self.subscribe('stimuli.single', stimulusId);

    stimulus = Stimuli.findOne({});
    if(stimulus) {
      self.subscribe('stimulusfiles.byStimulusId', stimulusId, dummy++);
      self.subscribe('aois.byStimulusId', stimulusId);
      // self.subscribe('recordings.byStimulusId', stimulusId);
    }
  });
});

Template.Stimulus.helpers({
  stimulus: () => {
    return Stimuli.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  stimulus: () => {
    return Stimuli.findOne();
  },
});

Template.Stimulus.events({
  'click .update-stimulus': function() {
    Session.set('updateStimulus', true);
  }
});

Template.Stimulus.destroyed = function(){
  Session.set('updateStimulus', false);
}





// Template.Stimulus.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     var studyId = FlowRouter.getParam('studyId');
//     self.subscribe('studies.single', studyId);
//
//     var stimulusId = FlowRouter.getParam('stimulusId');
//     self.subscribe('stimuli.single', stimulusId);
//     self.subscribe('stimulusfiles.byStimulusId', stimulusId);
//   });
// });
//
// Template.Stimulus.helpers({
//   stimulus: () => {
//     return Stimuli.findOne();
//   },
//   stimulusfile: () => {
//     return Stimulusfiles.collection.findOne({});
//   },
//   study: () => {
//     return Studies.findOne();
//   },
// });
//
// Template.BreadCrumbs.helpers({
//   stimulus: () => {
//     return Stimuli.findOne();
//   },
// });
//
// Template.Stimulus.events({
//   'click .update-stimulus': function() {
//     Session.set('updateStimulus', true);
//   }
// });
//
// Template.Stimulus.destroyed = function(){
//   Session.set('updateStimulus', false);
// }
