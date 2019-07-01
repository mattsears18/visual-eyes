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
    Glances.remove({ analysisId: analysis._id });
    Jobs.remove({
      'data.analysisId': analysis._id,
    });
  }
});

Analyses.after.insert(function(userId, analysis) {
  Meteor.call('analyses.makeGlanceJobsJob', {
    analysisId: analysis._id,
  });
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
      || this.previous.minGlanceTime != analysis.minGlanceTime
      || this.previous.glanceGap != analysis.glanceGap
      || !helpers.arraysEqual(this.previous.stimulusIds, analysis.stimulusIds)
      || !helpers.arraysEqual(
        this.previous.participantIds,
        analysis.participantIds,
      )
    ) {
      Meteor.call('analyses.makeGlanceJobsJob', {
        analysisId: analysis._id,
      });
    }
  }
});
