import Jobs from '../../../collections/Jobs/Jobs';

Template.NewStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    // self.subscribe('files.datafiles.all');
    Meteor.subscribe('files.datafiles.all');
  });
});

Template.NewStudy.events({
  'click .fa-close': function() {
    Session.set('newStudy', false);
  }
});

AutoForm.hooks({
  insertStudyForm: {
    onSuccess: function(formType, studyId) {
      FlowRouter.go('/studies/' + studyId);

      // var job = new Job(Jobs, 'studies.processDatafiles',
      //   { studyId: studyId, }
      // );

      // job.priority('normal')
      //   .save();               // Commit it to the server
    },
  }
});
