Meteor.methods({
  'studies.updateDatafilesProcessedStatus'({ studyId }) {
    console.log('update datafiles processed status');

    study = Studies.findOne(studyId);

    //only update status periodically,
    //otherwise this method creates a continuous update loop
    var now = moment();
    var then = moment(study.datafilesProcessedLastUpdated);
    //then works even if datafilesProcessedLastUpdated is not set

    diff = now.diff(then);

    //only update if datafilesProcessedLastUpdated was empty
    //or if 1 seconds has past since last update
    if(diff == 0 || diff > 1000) {
      if(study.allDatafilesProcessed()) {
        Studies.update({ _id: study._id}, { $set: {
          datafilesProcessed: true,
          datafilesProcessing: false,
          datafilesProcessedLastUpdated: Date.now(),
        }});
      } else {
        Studies.update({ _id: study._id}, { $set: {
          datafilesProcessed: false,
          datafilesProcessing: true,
          datafilesProcessedLastUpdated: Date.now(),
        }});
      }
    }
  },
});
