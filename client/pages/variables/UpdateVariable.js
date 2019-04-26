Template.UpdateVariable.events({
  'click .fa-close': function() {
    Session.set('updateVariable', false);
  }
});

AutoForm.hooks({
  updateVariableForm: {
    onSuccess: function(formType, result) {
      Session.set('updateVariable', false);
    },
  }
});

Template.UpdateVariable.helpers({
  deleteBeforeRemove: function() {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId + '/variables');
        this.remove();
      }
    };
  },
});
