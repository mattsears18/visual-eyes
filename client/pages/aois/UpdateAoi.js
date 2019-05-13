Template.UpdateAoi.onCreated(function() {
  const self = this;
  self.autorun(function() {
    studyId = FlowRouter.getParam('studyId');
    self.subscribe('stimuli.byStudyId', studyId);
  });
});

Template.UpdateAoi.events({
  'click .fa-close'() {
    Session.set('updateAoi', false);
  },
});

AutoForm.hooks({
  updateAoiForm: {
    onSuccess(formType, result) {
      Session.set('updateAoi', false);
    },
  },
});

Template.UpdateAoi.helpers({
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        const studyId = FlowRouter.getParam('studyId');
        FlowRouter.go(`/studies/${studyId}/stimuli`);
        this.remove();
      }
    };
  },
});
