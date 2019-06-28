Template.NewGaze.events({
  'click .fa-close'() {
    Session.set('newGaze', false);
  },
});

AutoForm.hooks({
  insertGazeForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/gazes/${result}`);
    },
  },
});
