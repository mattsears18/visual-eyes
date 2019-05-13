Template.NewAoi.events({
  'click .fa-close'() {
    Session.set('newAoi', false);
  },
});

AutoForm.hooks({
  insertAoiForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/aois/${result}`);
    },
  },
});
