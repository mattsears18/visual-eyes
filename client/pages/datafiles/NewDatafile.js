Template.NewDatafile.events({
  'click .fa-close': function() {
    Session.set('newDatafile', false);
  }
});

AutoForm.hooks({
  insertDatafileForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/datafiles/' + result);
    },
  }
});
