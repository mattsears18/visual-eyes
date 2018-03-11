Datafiles.collection.after.remove(function (userId, datafile) {
  console.log('after update:');
  console.log(datafile);

  Recordings.remove({datafileId: datafile._id});
  //TODO remove datafileId from all AOIs
});
