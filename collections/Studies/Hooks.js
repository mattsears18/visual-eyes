import Studies from './Studies';

Studies.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':           [userId],
    'destroy':          [userId],
    'createAnalyses':   [userId],
  };
});

Studies.after.insert(function(userId, doc) {
  if(Meteor.isServer) {
    Meteor.call('datafiles.removeOrphans');
  }
});

Studies.after.update(function(userId, study, fieldNames, modifier, options) {
  if(Meteor.isServer) {
    Meteor.call('datafiles.removeOrphans');
  }
});

Studies.after.remove(function(userId, study) {
  if(Meteor.isServer) {
    Datafiles.remove({ _id: { $in: study.datafileIds }});
    Analyses.remove({ studyId: study._id });
    Aois.remove({ studyId: study._id });
  }
});
