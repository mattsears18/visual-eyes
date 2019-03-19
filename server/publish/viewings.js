////////////////////////////////////////////////////////////////////////////////
// Viewings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('viewings.all', function() {
  return Viewings.find({},
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});

Meteor.publish('viewings.single', function(id) {
  check(id, String);
  return Viewings.find({_id: id},
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});

Meteor.publish('viewings.single.withRecordingPoints', function(id) {
  check(id, String);
  return Viewings.find({_id: id},
    { fields: { recordingIds: 0 }}
  );
});

Meteor.publish('viewings.byStudyId', (studyId) => {
  check(studyId, String);
  return Viewings.find({ studyId: studyId },
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});

Meteor.publish('viewings.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId: analysisId },
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});

Meteor.publish('viewings.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Viewings.find({ analysisId: analysisId, aoiId: aoiId },
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});

Meteor.publish('viewings.byParticipantId', (participantId) => {
  check(participantId, String);
  return Viewings.find({ participantId: participantId },
    { fields: { recordingIds: 0, recordingPoints: 0 }}
  );
});
