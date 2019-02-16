Template.UpdateVariable.onCreated(function() {
  var self = this;
  self.autorun(function() {
    studyId = FlowRouter.getParam('studyId');
    self.subscribe('stimuli.byStudyId', studyId);
  });
});

Template.UpdateVariable.events({
  'click .fa-close': function() {
    Session.set('updateVariable', false);
  }
});

AutoForm.hooks({
  updateVariableForm: {
    onSuccess: function(formType, result) {
      Session.set('updateVariable', false);

      //TODO make this a Template.subscribe() instead of Meteor.subscribe()
      //this is necessary to update the stimulus
      //see step #4 here: https://guide.meteor.com/data-loading.html#changing-arguments
      //subscription arguments don't change on variable update form submission
      variableId = FlowRouter.getParam('variableId');
      Meteor.subscribe('stimuli.byVariableId', variableId);
    },
  }
});

Template.UpdateVariable.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId);
        this.remove();
      }
    };
  },
});
