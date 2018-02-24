Template.NewSpecification.events({
  'click .fa-close': function() {
    Session.set('newSpecification', false);
  }
});

AutoForm.hooks({
  insertSpecificationForm: {
    onSuccess: function(formType, result) {
      projectId = FlowRouter.getParam('projectId');
      FlowRouter.go('/projects/' + projectId + '/specifications/' + result);
    },
  }
});

Template.NewSpecification.helpers({
  projectId: () => {
    return FlowRouter.getParam('projectId');
  },
});
