Template.StimuliList.onCreated(function() {
  var self = this;
  this.stimulusId = new ReactiveVar([]);

  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('stimulusfiles.byStudyId', studyId);
  });
});

Template.StimuliList.helpers({
  study: () => {
    return Studies.findOne();
  },
  stimuli: () => {
    return Stimuli.find({}, { sort: { name: 1 }});
  },
});

Template.StimuliList.events({
  'click .upload-stimulusfile': (e, template) => {
    template.stimulusId.set(e.target.dataset.stimulusid);
    $('#stimulusfileInput').click();
  },
  'change #stimulusfileInput': (e, template) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Stimulusfiles.insert({
          file: file,
          meta: {
            studyId: FlowRouter.getParam('studyId'),
            stimulusId: template.stimulusId.get(),
          },
          streams: 'dynamic',
          chunkSize: 'dynamic'
        });

        uploadInstance.on('end', (err, stimulusfile) => {
          if(err) {
            console.log(err);
          } else {
            template.subscribe('stimulusfiles.byStudyId', FlowRouter.getParam('studyId'), Math.random());
          }
        });
      }
    }
  },
});
