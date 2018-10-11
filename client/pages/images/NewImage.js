Template.NewImage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('images.all');
  });
});

Template.NewImage.events({
  'click .fa-close': function() {
    Session.set('newImage', false);
  }
});

AutoForm.hooks({
  insertImageForm: {
    onSuccess: function(formType, imageId) {
      FlowRouter.go('/images/' + imageId);
    },
  }
});
