Template.Variable.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    const variableId = FlowRouter.getParam('variableId');

    self.subscribe('variables.single', variableId);
    self.subscribe('stimuli.byVariableId', variableId);

    stimulus = Stimuli.findOne({});
    if (stimulus) {
      self.subscribe('stimulusfiles.byStimulusId', stimulus._id);
    }
  });
});

Template.Variable.helpers({
  variable: () => Variables.findOne(),
  study: () => Studies.findOne(),
});

Template.BreadCrumbs.helpers({
  variable: () => Variables.findOne(),
});

Template.Variable.events({
  'click .update-variable'() {
    Session.set('updateVariable', true);
  },
});

Template.Variable.destroyed = function() {
  Session.set('updateVariable', false);
};
