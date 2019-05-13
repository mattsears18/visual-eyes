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
    Viewings.remove({ analysisId: analysis._id });
    Jobs.remove({
      'data.analysisId': analysis._id,
    });
  }
});

Analyses.after.insert(function(userId, analysis) {
  if (Meteor.isServer) {
    Analyses.findOne({ _id: analysis._id }).makeViewingJobs();
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
      this.previous.ignoreOutsideImage != analysis.ignoreOutsideImage
      || this.previous.minViewingTime != analysis.minViewingTime
      || this.previous.viewingGap != analysis.viewingGap
      || !helpers.arraysEqual(this.previous.stimulusIds, analysis.stimulusIds)
      || !helpers.arraysEqual(
        this.previous.participantIds,
        analysis.participantIds,
      )
    ) {
      Analyses.findOne({ _id: analysis._id }).makeViewingJobs();
    }
  }
});
