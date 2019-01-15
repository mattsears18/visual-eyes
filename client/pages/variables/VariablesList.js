Template.VariablesList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    if(study) {
      self.subscribe('studies.single', studyId);
      self.subscribe('variables.byStudyId', studyId);
    }
  });
});

Template.VariablesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  variables: () => {
    return Variables.find({}, { sort: { name: 1 }});
  },
});

Template.VariablesList.events({
  'click .new-variable': function() {
    Session.set('newVariable', true);
  }
});

Template.VariablesList.destroyed = function(){
  Session.set('newVariable', false);
}
