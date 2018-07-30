Template.UpdateAnalysis.events({
  'click .fa-close': function() {
    Session.set('updateAnalysis', false);
  }
});

AutoForm.hooks({
  updateAnalysisForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAnalysis', false);
    },
  }
});

Template.UpdateAnalysis.helpers({
  deleteOnSuccess: function() {
    return function() {
      var studyId = FlowRouter.getParam('studyId');
      FlowRouter.go('/studies/' + studyId);
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
