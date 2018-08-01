import Analyses from './Analyses';

Analyses.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }
});

Analyses.after.remove(function(userId, analysis) {
  Viewings.remove({ analysisId: analysis.id });
});
