Datafiles.collection.after.remove(function (userId, datafile) {
  console.log('after update:');
  console.log(datafile);

  Recordings.remove({datafileId: datafile._id});
  //TODO remove datafileId from all AOIs
  Aois.update({studyId: datafile.studyId}, {$pull: {datafileIds: datafile._id}});
  ///WTF?!
  // Studies.update({_id: datafile.studyId}, {$pull: {datafileIds: datafile._id}});
  ///WTF?!
});
