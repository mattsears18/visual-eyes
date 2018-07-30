import Studies from './Studies';

Studies.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':           [userId],
    'destroy':          [userId],
    'createAnalyses':   [userId],
  }
});

Studies.after.remove(function(userId, study) {
  Datafiles.remove({ studyId: study._id });
  Analyses.remove({ studyId: study._id });
});
