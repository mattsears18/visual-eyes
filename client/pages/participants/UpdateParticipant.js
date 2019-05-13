Template.UpdateParticipant.helpers({
  participant: () => Participants.findOne(),
  variables: () => Variables.find(),
});

Template.UpdateParticipant.events({
  'click .fa-close'() {
    Session.set('updateParticipant', false);
  },
});

AutoForm.hooks({
  updateParticipantForm: {
    onSuccess(formType, result) {
      Session.set('updateParticipant', false);
    },
  },
});

Template.UpdateParticipant.helpers({
  deleteBeforeRemove() {
    return function (collection, id) {
      const doc = collection.findOne(id);
      if (confirm(`Really delete "${doc.name}"?`)) {
        const studyId = FlowRouter.getParam('studyId');
        FlowRouter.go(`/studies/${studyId}/participants`);
        this.remove();
      }
    };
  },
});
