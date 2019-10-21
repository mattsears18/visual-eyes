import Jobs from '../Jobs/Jobs';

Analyses.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
  doc.userPermissions = {
    update: [userId],
    destroy: [userId],
  };
});

Analyses.after.remove(function(userId, analysis) {
  if (Meteor.isServer) {
    Visits.remove({ analysisId: analysis._id });
    Jobs.remove({
      'data.analysisId': analysis._id,
    });
  }
});

Analyses.after.insert(function(userId, analysisDoc) {
  if (Meteor.isServer) {
    Analyses.findOne({ _id: analysisDoc._id }).makeVisitJobsJob();
  }
});

Analyses.after.update(function(
  userId,
  analysis,
  fieldNames,
  modifier,
  options,
) {
  if (Meteor.isServer) {
    if (
      this.previous.minVisitDuration != analysis.minVisitDuration
      || this.previous.maxOffTargetFixations != analysis.maxOffTargetFixations
      || !helpers.arraysEqual(this.previous.stimulusIds, analysis.stimulusIds)
      || !helpers.arraysEqual(
        this.previous.participantIds,
        analysis.participantIds,
      )
    ) {
      Analyses.findOne({ _id: analysis._id }).makeVisitJobsJob();
    }
  }
});
