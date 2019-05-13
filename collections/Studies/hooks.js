Studies.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.userPermissions = {
    update: [userId],
    destroy: [userId],
    createAnalyses: [userId],
  };
});

Studies.after.remove(function(userId, study) {
  if (Meteor.isServer) {
    Analyses.remove({ studyId: study._id });
    Aois.remove({ studyId: study._id });
    Datafiles.remove({ studyId: study._id });
    Stimuli.remove({ studyId: study._id });
    Participants.remove({ studyId: study._id });
    Variables.remove({ studyId: study._id });
    Variablefiles.remove({ studyId: study._id });
  }
});
