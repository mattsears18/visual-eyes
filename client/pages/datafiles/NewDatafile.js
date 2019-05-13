Template.NewDatafile.events({
  'click .fa-close'() {
    Session.set('newDatafile', false);
  },
});

AutoForm.hooks({
  insertDatafileForm: {
    onSuccess(formType, result) {
      FlowRouter.go(`/datafiles/${result}`);
    },
  },
});
