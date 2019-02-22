Meteor.methods({
  'stimulusfiles.removeOrphans'() {
    console.log('remove orphaned stimulusfiles');
    stimulusfilesArr = Stimulusfiles.collection.find({}).fetch();

    stimulusfilesArr.forEach(function(stimulusfile) {
      stimulus = Stimuli.findOne({ stimulusfileId: stimulusfile._id });
      if(!stimulus) {
        // console.log('stimulusfile: ' + stimulusfile._id + ' has no study, delete it');
        Stimulusfiles.collection.remove(stimulusfile._id);
      }
    });
  },
});
