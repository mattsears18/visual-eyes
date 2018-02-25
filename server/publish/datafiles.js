////////////////////////////////////////////////////////////////////////////////
// Datafiles Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('files.datafiles.all', () => {
  return Datafiles.collection.find({});
});

Meteor.publish('files.datafiles.byStudyId', (studyId) => {
  study = Studies.findOne({_id: studyId});
  return Datafiles.collection.find({
    _id: {$in: study.datafiles},
  });
});
