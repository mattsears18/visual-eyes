import Jobs from '../../../collections/Jobs/Jobs';

Template.UpdateStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('files.datafiles.all');
  });
});

Template.UpdateStudy.events({
  'click .fa-close': function() {
    Session.set('updateStudy', false);
  }
});

AutoForm.hooks({
  updateStudyForm: {
    onSuccess: function(formType, studyId) {
      Session.set('updateStudy', false);

      // var job = new Job(Jobs, 'studies.processDatafiles',
      //   { studyId: study._id, }
      // );
      //
      // job.priority('normal')
      //   .save();               // Commit it to the server
    },
  }
});

Template.UpdateStudy.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/studies');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
