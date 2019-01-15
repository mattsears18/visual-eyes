Template.Variable.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var variableId = FlowRouter.getParam('variableId');

    self.subscribe('variables.single', variableId);
    self.subscribe('images.byVariableId', variableId);

    image = Images.findOne({});
    if(image) {
      self.subscribe('imagefiles.byImageId', image._id);
    }
  });
});

Template.Variable.helpers({
  variable: () => {
    return Variables.findOne();
  },
  study: () => {
    return Studies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  variable: () => {
    return Variables.findOne();
  },
});

Template.Variable.events({
  'click .update-variable': function() {
    Session.set('updateVariable', true);
  }
});

Template.Variable.destroyed = function(){
  Session.set('updateVariable', false);
}
