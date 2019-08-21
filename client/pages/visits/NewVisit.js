Template.NewVisit.events({
  'click .fa-close'() {
    Session.set('newVisit', false);
  },
});

AutoForm.hooks({
  insertVisitForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/visits/${result}`);
    },
  },
});
