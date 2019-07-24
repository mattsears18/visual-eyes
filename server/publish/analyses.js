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
    { sort: { minGlanceDuration: 1, maxGlanceGapDuration: 1, name: 1 } }
  );
});

Meteor.publish('analyses.byGlanceId', function(glanceId) {
  check(glanceId, String);
  glance = Glances.findOne({ _id: glanceId });
  return Analyses.find({ _id: glance.analysisId });
});

Meteor.publish('analyses.byParticipantId', participantId => {
  check(participantId, String);
  return Analyses.find({ participantIds: participantId });
});
