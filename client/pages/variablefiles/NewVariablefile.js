import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.NewVariablefile.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.NewVariablefile.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.NewVariablefile.events({
  'click .fa-close': function() {
    Session.set('newVariablefile', false);
  },
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Variablefiles.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic',
        meta: { studyId: FlowRouter.getParam('studyId') },
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        }
        template.currentUpload.set(false);
        Session.set('newVariablefile', false);
      });

      upload.start();
    }
  }
});
