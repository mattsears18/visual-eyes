Template.NewDrawing.events({
  'click .fa-close': function() {
    Session.set('newDrawing', false);
  }
});

AutoForm.hooks({
  insertDrawingForm: {
    onSuccess: function(formType, result) {
      projectId = FlowRouter.getParam('projectId');
      FlowRouter.go('/projects/' + projectId + '/drawings/' + result);
    },
  }
});

Template.NewDrawing.helpers({
  projectId: () => {
    return FlowRouter.getParam('projectId');
  },
});
