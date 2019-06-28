// //////////////////////////////////////////////////////////////////////////////
// Analyses Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('analyses.all', function() {
  return Analyses.find({});
});

Meteor.publish('analyses.single', function(id) {
  check(id, String);
  return Analyses.find({ _id: id });
});

Meteor.publish('analyses.byStudyId', studyId => {
  check(studyId, String);
  return Analyses.find(
    { studyId },
    { sort: { minGazeTime: 1, gazeGap: 1, name: 1 } }
  );
});

Meteor.publish('analyses.byGazeId', function(gazeId) {
  check(gazeId, String);
  gaze = Gazes.findOne({ _id: gazeId });
  return Analyses.find({ _id: gaze.analysisId });
});

Meteor.publish('analyses.byParticipantId', participantId => {
  check(participantId, String);
  return Analyses.find({ participantIds: participantId });
});
