Meteor.methods({
  'datafiles.removeOrphans'() {
    // console.log('remove orphaned datafiles');
    datafilesArr = Datafiles.collection.find({}).fetch();

    datafilesArr.forEach(function(datafile) {
      study = Studies.findOne({ datafileIds: datafile._id });
      if(!study) {
        // console.log('datafile: ' + datafile._id + ' has no study, delete it');
        Datafiles.collection.remove(datafile._id);
      }
    });
  },
});
