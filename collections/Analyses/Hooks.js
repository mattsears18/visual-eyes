import Analyses from './Analyses';
import Jobs from '../Jobs/Jobs';

Analyses.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }
});

Analyses.after.remove(function(userId, analysis) {
  if(Meteor.isServer) {
    Viewings.remove({ analysisId: analysis.id });
    Jobs.remove({
      type: 'analyses.makeViewings',
      'data.analysisId': analysis.id,
    });
  }
});

Analyses.after.insert(function(userId, analysis) {
  if(Meteor.isServer) {
    Meteor.call('analyses.makeDatafileJobs', {
      analysisId: analysis._id,
    });
  }
});
