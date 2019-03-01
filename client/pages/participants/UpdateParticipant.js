Template.UpdateParticipant.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('variables.byStudyId', studyId);

    var participantId = FlowRouter.getParam('participantId');
    self.subscribe('participants.single', participantId);
  });
});

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

      //TODO make this a Template.subscribe() instead of Meteor.subscribe()
      //this is necessary to update the stimulus
      //see step #4 here: https://guide.meteor.com/data-loading.html#changing-arguments
      //subscription arguments don't change on participant update form submission
      participantId = FlowRouter.getParam('participantId');
      Meteor.subscribe('stimuli.byParticipantId', participantId);
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
