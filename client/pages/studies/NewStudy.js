Template.NewStudy.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('datafiles.all');
  });
});

Template.NewStudy.events({
  'click .fa-close'() {
    Session.set('newStudy', false);
  },
});

AutoForm.hooks({
  insertStudyForm: {
    onSuccess(formType, studyId) {
      FlowRouter.go(`/studies/${studyId}`);
    },
  },
});
