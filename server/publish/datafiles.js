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
    _id: {$in: study.datafiles},
  }).cursor;
});
