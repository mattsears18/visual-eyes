Template.NewStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    // self.subscribe('datafiles.all');
    self.subscribe('datafiles.all');
    self.subscribe('images.all');
  });
});

Template.NewStudy.events({
  'click .fa-close': function() {
    Session.set('newStudy', false);
  }
});

AutoForm.hooks({
  insertStudyForm: {
    onSuccess: function(formType, studyId) {
      FlowRouter.go('/studies/' + studyId);
    },
  }
});
