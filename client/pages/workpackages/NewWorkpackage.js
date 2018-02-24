Template.NewWorkpackage.events({
  'click .fa-close': function() {
    Session.set('newWorkpackage', false);
  }
});

AutoForm.hooks({
  insertWorkpackageForm: {
    onSuccess: function(formType, result) {
      projectId = FlowRouter.getParam('projectId');
      FlowRouter.go('/projects/' + projectId + '/workpackages/' + result);
    },
  }
});

Template.NewWorkpackage.helpers({
  projectId: () => {
    return FlowRouter.getParam('projectId');
  },
});
