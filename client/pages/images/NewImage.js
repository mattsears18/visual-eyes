Template.NewImage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('imagefiles.all');
  });
});

Template.NewImage.events({
  'click .fa-close': function() {
    Session.set('newImage', false);
  }
});

AutoForm.hooks({
  insertImageForm: {
    onSuccess: function(formType, result) {
      studyId = FlowRouter.getParam('studyId');
      FlowRouter.go('/studies/' + studyId + '/images/' + result);
    },
    onError: function(formType, error) {
      console.log(error);
    },
  }
});
