Template.UpdateStimulus.onCreated(function() {
  const self = this;
  let intervalId;
  self.autorun(function() {
    self.subscribe('stimulusfiles.all');
  });
});

Template.UpdateStimulus.events({
  'click .fa-close'() {
    Session.set('updateStimulus', false);
  },
  'change .af-file-upload-capture': () => {
    intervalId = Meteor.setInterval(changeWidthHeight, 10);
  },
});

function changeWidthHeight() {
  sfId = $('input[name="stimulusfileId"]').val();
  if (sfId) {
    fileSearch = Stimulusfiles.find({ _id: sfId });
    if (fileSearch) {
      fileSearch = fileSearch.fetch();
      if (fileSearch.length) {
        newFile = fileSearch[0];
        $('input[name="width"]').val(newFile.fileWidth);
        $('input[name="height"]').val(newFile.fileHeight);
        Meteor.clearInterval(intervalId);
      } else {
        clearWidthHeight();
      }
    } else {
      clearWidthHeight();
    }
  } else {
    clearWidthHeight();
  }
}

function clearWidthHeight() {
  $('input[name="width"]').val('');
  $('input[name="height"]').val('');
}

AutoForm.hooks({
  updateStimulusForm: {
    onSuccess(formType, result) {
      Session.set('updateStimulus', false);
    },
  },
});

Template.UpdateStimulus.helpers({
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

Template.UpdateStimulus.destroyed = function() {
  if (typeof (intervalId) !== 'undefined') {
    Meteor.clearInterval(intervalId);
  }
};
