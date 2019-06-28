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
    Gazes.remove({ analysisId: analysis._id });
    Jobs.remove({
      'data.analysisId': analysis._id,
    });
  }
});

Analyses.after.insert(function(userId, analysis) {
  if (Meteor.isServer) {
    Analyses.findOne({ _id: analysis._id }).makeGazeJobs();
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
      || this.previous.minGazeTime != analysis.minGazeTime
      || this.previous.gazeGap != analysis.gazeGap
      || !helpers.arraysEqual(this.previous.stimulusIds, analysis.stimulusIds)
      || !helpers.arraysEqual(
        this.previous.participantIds,
        analysis.participantIds,
      )
    ) {
      Analyses.findOne({ _id: analysis._id }).makeGazeJobs();
    }
  }
});
