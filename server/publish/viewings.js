////////////////////////////////////////////////////////////////////////////////
// Viewings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('viewings.all', function() {
  return Viewings.find({},
    { fields: { gazepoints: 0 }}
  );
});

Meteor.publish('viewings.single', function(id) {
  check(id, String);
  return Viewings.find({_id: id},
    { fields: { gazepoints: 0 }}
  );
});

Meteor.publish('viewings.single.withGazepoints', function(id) {
  check(id, String);
  return Viewings.find({ _id: id });
});

Meteor.publish('viewings.byStudyId', (studyId) => {
  check(studyId, String);
  return Viewings.find({ studyId: studyId },
    { fields: { gazepoints: 0 }}
  );
});

Meteor.publish('viewings.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId: analysisId },
    { fields: { gazepoints: 0 }}
  );
});

Meteor.publish('viewings.byAnalysisIdWithGazepoints', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId: analysisId });
});

Meteor.publish('viewings.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Viewings.find({ analysisId: analysisId, aoiId: aoiId },
    { fields: { gazepoints: 0 }}
  );
});

Meteor.publish('viewings.byParticipantId', (participantId) => {
  check(participantId, String);
  return Viewings.find({ participantId: participantId },
    { fields: { gazepoints: 0 }}
  );
});
