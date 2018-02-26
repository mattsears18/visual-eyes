Datafiles = new FilesCollection({
  // debug: true,
  collectionName: 'Datafiles',
  allowClientCode: true, // Required to let you remove uploaded file
  onAfterUpload: function(doc) {
    Meteor.call('datafiles.process', {
      datafileId: doc._id,
    });
  },
});

export default Datafiles;
