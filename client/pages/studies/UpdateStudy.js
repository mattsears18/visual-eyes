Template.UpdateStudy.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('datafiles.all');
    self.subscribe('stimuli.all');
  });
});

Template.UpdateStudy.events({
  'click .fa-close'() {
    Session.set('updateStudy', false);
  },
});

AutoForm.hooks({
  updateStudyForm: {
    onSuccess(formType, result) {
      Session.set('updateStudy', false);
    },
  },
});

Template.UpdateStudy.helpers({
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        FlowRouter.go('/studies');
        this.remove();
      }
    };
  },
});
