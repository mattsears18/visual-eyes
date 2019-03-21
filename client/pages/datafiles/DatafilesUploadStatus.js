Template.DatafilesUploadStatus.onCreated(function () {
  this.currentUploads = new ReactiveVar([]);
});

Template.DatafilesUploadStatus.onRendered(function() {
  $('#datafileInput').click();
});

Template.DatafilesUploadStatus.helpers({
  datafiles: function () {
    return Datafiles.find();
  }
});

Template.DatafilesUploadStatus.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  currentUploads: function() {
    return Template.instance().currentUploads.get();
  }
});

Template.DatafilesUploadStatus.events({
  'change #datafileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      var files = e.currentTarget.files;
      if(files) {
        var studyId = FlowRouter.getParam('studyId');
        for(i=0; i < files.length; i++){
          var uploadInstance = Datafiles.insert({
            file: files[i],
            meta: {
              studyId: studyId,
            },
            streams: 'dynamic',
            chunkSize: 'dynamic'
          }, false);

          uploadInstance.on('start', function() {
            uploads = template.currentUploads.get();
            uploads.push(this);
            template.currentUploads.set(uploads);
          });

          uploadInstance.on('end', function(error, datafileDoc) {
            if (error) {
              window.alert('Error during upload: ' + error.reason);
            }

            uploads = template.currentUploads.get();
            uploads = uploads.filter(function(upload) {
              return (!(upload.config.fileId == datafileDoc._id));
            });
            template.currentUploads.set(uploads);
            if(!uploads.length) {
              Session.set('uploadingDatafiles', false);
            }
          });

          uploadInstance.start();
        }
        $('#datafileInput').val('');
      }
    }
  }
});
