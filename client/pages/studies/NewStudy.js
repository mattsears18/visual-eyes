Template.NewStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    // self.subscribe('files.datafiles.all');
    Meteor.subscribe('files.datafiles.all');
  });
});

Template.NewStudy.events({
  'click .fa-close': function() {
    Session.set('newStudy', false);
  }
});

AutoForm.hooks({
  insertStudyForm: {
    onSuccess: function(formType, result) {
      FlowRouter.go('/studies/' + result);
    },
  }
});
