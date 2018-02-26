////////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('files.datafiles.all', () => {
  return Datafiles.find({}).cursor;
});

Meteor.publish('files.datafiles.byStudyId', (studyId) => {
  check(studyId, String);

  study = Studies.findOne({_id: studyId});
  return Datafiles.find({
    _id: {$in: study.datafileIds},
  }).cursor;

  //TODO Need this to push new Datafiles to client when study.datafileIds is
  //updated i.e. when a study is updated with a new datafile, it should show up
  //in Study.html
});
