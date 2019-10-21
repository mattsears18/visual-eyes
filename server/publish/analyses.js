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

Meteor.publish('analyses.byStudyId', (studyId) => {
  check(studyId, String);
  return Analyses.find(
    { studyId },
    {
      sort: {
        minFixationDuration: 1,
        maxOffTargetFixations: 1,
        minVisitDuration: 1,
        name: 1,
      },
    },
  );
});

Meteor.publish('analyses.byVisitId', function(visitId) {
  check(visitId, String);
  visit = Visits.findOne({ _id: visitId });
  return Analyses.find({ _id: visit.analysisId });
});

Meteor.publish('analyses.byParticipantId', (participantId) => {
  check(participantId, String);
  return Analyses.find({ participantIds: participantId });
});
