// //////////////////////////////////////////////////////////////////////////////
// Gazes Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('gazes.all', function() {
  return Gazes.find({},
    { fields: { gazepoints: 0 } });
});

Meteor.publish('gazes.single', function(id) {
  check(id, String);
  return Gazes.find({ _id: id },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('gazes.single.withGazepoints', function(id) {
  check(id, String);
  return Gazes.find({ _id: id });
});

Meteor.publish('gazes.byStudyId', (studyId) => {
  check(studyId, String);
  return Gazes.find({ studyId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('gazes.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Gazes.find({ analysisId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('gazes.simple.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Gazes.find({ analysisId },
    {
      fields: {
        stimulusId: 1,
        participantId: 1,
        number: 1,
      },
    });
});

Meteor.publish('gazes.simple.byParams', params => Gazes.find(params,
  {
    fields: {
      stimulusId: 1,
      participantId: 1,
      number: 1,
    },
  }));

Meteor.publish('gazes.byParams.withGazepoints', params => Gazes.find(params));

Meteor.publish('gazes.byAnalysisIdWithGazepoints', (analysisId) => {
  check(analysisId, String);
  return Gazes.find({ analysisId });
});

Meteor.publish('gazes.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Gazes.find({ analysisId, aoiId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('gazes.byParticipantId', (participantId) => {
  check(participantId, String);
  return Gazes.find({ participantId },
    { fields: { gazepoints: 0 } });
});
