// //////////////////////////////////////////////////////////////////////////////
// Glances Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('glances.all', function() {
  return Glances.find({}, { fields: { gazepoints: 0 } });
});

Meteor.publish('glances.single', function(id) {
  check(id, String);
  return Glances.find({ _id: id }, { fields: { gazepoints: 0 } });
});

Meteor.publish('glances.single.withGazepoints', function(id) {
  check(id, String);
  return Glances.find({ _id: id });
});

Meteor.publish('glances.byStudyId', (studyId) => {
  check(studyId, String);
  return Glances.find({ studyId }, { fields: { gazepoints: 0 } });
});

// Meteor.publish('glances.byAnalysisId', (analysisId) => {
//   check(analysisId, String);
//   return Glances.find({ analysisId }, { fields: { gazepoints: 0 } });
// });

Meteor.publish('glances.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Glances.find(
    { analysisId },
    {
      fields: {
        _id: 1,
        participantId: 1,
        stimulusId: 1,
        number: 1,
        aoiIds: 1,
        duration: 1,
        status: 1,
      },
    },
  );
});

Meteor.publish('glances.simple.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Glances.find(
    { analysisId },
    {
      fields: {
        stimulusId: 1,
        participantId: 1,
        number: 1,
      },
    },
  );
});

Meteor.publish('glances.simple.byParams', params => Glances.find(params, {
  fields: {
    participantId: 1,
    stimulusId: 1,
    number: 1,
  },
}));

Meteor.publish('glances.byParams.withGazepoints', params => Glances.find(params));

Meteor.publish('glances.byAnalysisIdWithGazepoints', (analysisId) => {
  check(analysisId, String);
  return Glances.find({ analysisId });
});

Meteor.publish('glances.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Glances.find({ analysisId, aoiId }, { fields: { gazepoints: 0 } });
});

Meteor.publish('glances.byParticipantId', (participantId) => {
  check(participantId, String);
  return Glances.find({ participantId }, { fields: { gazepoints: 0 } });
});
