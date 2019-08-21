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

Meteor.publish('participants.byVisitId', function(visitId) {
  check(visitId, String);
  visit = Visits.findOne({ _id: visitId });
  return Participants.find({ _id: visit.participantId });
});
