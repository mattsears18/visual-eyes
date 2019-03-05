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
    Viewings.remove({ analysisId: analysis._id });
    Jobs.remove({
      'data.analysisId': analysis._id,
    });
  }
});

Analyses.after.insert(function(userId, analysis) {
  if(Meteor.isServer) {
    Meteor.call('analyses.makeParticipantJobs', { analysisId: analysis._id });
  }
});

Analyses.after.update(function(userId, analysis, fieldNames, modifier, options) {
  if(
    // this.previous.ignoreAoiNoName     != analysis.ignoreAoiNoName ||
    this.previous.ignoreOutsideImage  != analysis.ignoreOutsideImage ||
    this.previous.minViewingTime      != analysis.minViewingTime ||
    this.previous.period              != analysis.period ||
    this.previous.viewingGap          != analysis.viewingGap ||
    (! helpers.arraysEqual(this.previous.stimulusIds, analysis.stimulusIds)) ||
    (! helpers.arraysEqual(this.previous.participantIds, analysis.participantIds))
  ) {
    Meteor.call('analyses.makeParticipantJobs', { analysisId: analysis._id });
  }
});
