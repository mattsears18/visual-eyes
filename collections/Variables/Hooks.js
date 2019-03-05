import Variables from './Variables';

Variables.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }
});


Variables.after.remove(function (userId, variable) {
  // Participants.update({ studyId: variable.studyId }, {
  //   variableVals: { $pull: { variableId: variable._id }}});
});
