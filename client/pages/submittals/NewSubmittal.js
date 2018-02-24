Template.NewSubmittal.events({
  'click .fa-close': function() {
    Session.set('newSubmittal', false);
  }
});

AutoForm.hooks({
  insertSubmittalForm: {
    onSuccess: function(formType, result) {
      projectId = FlowRouter.getParam('projectId');
      FlowRouter.go('/projects/' + projectId + '/submittals/' + result);
    },
  }
});

Template.NewSubmittal.helpers({
  projectId: () => {
    return FlowRouter.getParam('projectId');
  },
});
