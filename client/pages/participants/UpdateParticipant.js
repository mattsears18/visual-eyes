Template.UpdateParticipant.helpers({
  participant: () => {
    return Participants.findOne();
  },
  variables: () => {
    return Variables.find();
  }
});

Template.UpdateParticipant.events({
  'click .fa-close': function() {
    Session.set('updateParticipant', false);
  }
});

AutoForm.hooks({
  updateParticipantForm: {
    onSuccess: function(formType, result) {
      Session.set('updateParticipant', false);
    },
  }
});

Template.UpdateParticipant.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId + '/participants');
        this.remove();
      }
    };
  },
});
