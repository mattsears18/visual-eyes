Template.UpdateAoi.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('images.all');
  });
});

Template.UpdateAoi.events({
  'click .fa-close': function() {
    Session.set('updateAoi', false);
  }
});

AutoForm.hooks({
  updateAoiForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAoi', false);

      //TODO make this a Template.subscribe() instead of Meteor.subscribe()
      //this is necessary to update the image
      //see step #4 here: https://guide.meteor.com/data-loading.html#changing-arguments
      //subscription arguments don't change on aoi update form submission
      aoiId = FlowRouter.getParam('aoiId');
      Meteor.subscribe('images.byAoiId', aoiId);
    },
  }
});

Template.UpdateAoi.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId);
        this.remove();
      }
    };
  },
});
