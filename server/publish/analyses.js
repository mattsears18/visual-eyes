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
    { sort: { minViewingTime: 1, viewingGap: 1, name: 1 } }
  );
});

Meteor.publish('analyses.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({ _id: viewingId });
  return Analyses.find({ _id: viewing.analysisId });
});

Meteor.publish('analyses.byParticipantId', participantId => {
  check(participantId, String);
  return Analyses.find({ participantIds: participantId });
});
