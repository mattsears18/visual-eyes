// //////////////////////////////////////////////////////////////////////////////
// Participants Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('participants.all', function() {
  return Participants.find({});
});

Meteor.publish('participants.single', function(id) {
  check(id, String);
  return Participants.find({ _id: id });
});

Meteor.publish('participants.byStudyId', (studyId) => {
  check(studyId, String);
  return Participants.find({ studyId },
    { sort: { name: 1 } });
});

Meteor.publish('participants.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({ _id: analysisId });
  if (analysis) {
    return Participants.find({ _id: { $in: analysis.participantIds } },
      { sort: { name: 1 } });
  }
});

Meteor.publish('participants.byGazeId', function(gazeId) {
  check(gazeId, String);
  gaze = Gazes.findOne({ _id: gazeId });
  return Participants.find({ _id: gaze.participantId });
});
