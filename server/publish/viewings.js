// //////////////////////////////////////////////////////////////////////////////
// Viewings Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('viewings.all', function() {
  return Viewings.find({},
    { fields: { gazepoints: 0 } });
});

Meteor.publish('viewings.single', function(id) {
  check(id, String);
  return Viewings.find({ _id: id },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('viewings.single.withGazepoints', function(id) {
  check(id, String);
  return Viewings.find({ _id: id });
});

Meteor.publish('viewings.byStudyId', (studyId) => {
  check(studyId, String);
  return Viewings.find({ studyId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('viewings.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('viewings.simple.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId },
    {
      fields: {
        stimulusId: 1,
        participantId: 1,
        number: 1,
      },
    });
});

Meteor.publish('viewings.simple.byParams', params => Viewings.find(params,
  {
    fields: {
      stimulusId: 1,
      participantId: 1,
      number: 1,
    },
  }));

Meteor.publish('viewings.byParams.withGazepoints', params => Viewings.find(params));

Meteor.publish('viewings.byAnalysisIdWithGazepoints', (analysisId) => {
  check(analysisId, String);
  return Viewings.find({ analysisId });
});

Meteor.publish('viewings.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Viewings.find({ analysisId, aoiId },
    { fields: { gazepoints: 0 } });
});

Meteor.publish('viewings.byParticipantId', (participantId) => {
  check(participantId, String);
  return Viewings.find({ participantId },
    { fields: { gazepoints: 0 } });
});
