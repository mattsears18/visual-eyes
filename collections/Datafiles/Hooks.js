Datafiles.collection.after.remove(function (userId, datafile) {
  // Update Study.datafileIds
  Studies.update(
    {_id: datafile.studyId},
    {$pull: {datafileIds: datafile._id}},
    {multi: true}
  );
  
  Recordings.remove({ datafileId: datafile._id });

  // Update AOI.datafileIds
  Aois.update(
    {studyId: datafile.studyId},
    {$pull: {datafileIds: datafile._id}},
    {multi: true}
  );

  // Delete any AOIs that no longer have datafileIds
  Aois.remove({ datafileIds: {$eq: []} });
});
