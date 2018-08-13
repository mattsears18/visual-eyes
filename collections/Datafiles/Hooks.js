import Jobs from '../Jobs/Jobs';

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

  // Delete any Viewings that no longer have datafileIds
  Viewings.remove({ datafileId: datafile._id });
});

Datafiles.collection.after.insert(function(userId, datafile) {
  var job = new Job(Jobs, 'datafiles.process',
    { datafileId: datafile._id, }
  );

  job.priority('normal')
    .retry({
      retries: Jobs.forever,   // Retry 5 times,
      wait: 5*1000,  // waiting 5 seconds between attempts
      backoff: 'constant'  // wait constant amount of time between each retry
    })
    // .delay(10000)
    .save();
});
