// //////////////////////////////////////////////////////////////////////////////
// Visits Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('visits.all', function() {
  return Visits.find({}, { fields: { gazepoints: 0 } });
});

Meteor.publish('visits.single', function(id) {
  check(id, String);
  return Visits.find({ _id: id }, { fields: { gazepoints: 0 } });
});

Meteor.publish('visits.single.withFixations', function(id) {
  check(id, String);
  return Visits.find({ _id: id });
});

Meteor.publish('visits.byStudyIdAnalysisIdParticipantIdNumber', function(
  studyId,
  analysisId,
  participantId,
  number,
) {
  check(studyId, String);
  check(analysisId, String);
  check(participantId, String);
  check(number, String);

  return Visits.find({
    studyId,
    analysisId,
    participantId,
    number: parseInt(number, 10),
  });
});

Meteor.publish('visits.byStudyId', studyId => {
  check(studyId, String);
  return Visits.find({ studyId }, { fields: { gazepoints: 0 } });
});

// Meteor.publish('visits.byAnalysisId', (analysisId) => {
//   check(analysisId, String);
//   return Visits.find({ analysisId }, { fields: { gazepoints: 0 } });
// });

Meteor.publish('visits.byAnalysisId', analysisId => {
  check(analysisId, String);
  return Visits.find(
    { analysisId },
    {
      fields: {
        _id: 1,
        analysisId: 1,
        participantId: 1,
        aoiId: 1,
        stimulusId: 1,
        number: 1,
        duration: 1,
      },
      sort: { participantName: 1, number: 1 },
    },
  );
});

Meteor.publish('visits.byAnalysisIdForExport', analysisId => {
  check(analysisId, String);
  return Visits.find(
    { analysisId },
    {
      fields: {
        _id: 1,
        analysisId: 1,
        participantId: 1,
        aoiId: 1,
        stimulusId: 1,
        number: 1,
        duration: 1,
        studyId: 1,
        timestamp: 1,
        timestampEnd: 1,
        fixationCount: 1,
        fixationFrequency: 1,
        coverage: 1,
      },
      sort: { participantName: 1, number: 1 },
    },
  );
});

Meteor.publish('visits.simple.byAnalysisId', analysisId => {
  check(analysisId, String);
  return Visits.find(
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

Meteor.publish('visits.simple.byParams', params =>
  Visits.find(params, {
    fields: {
      participantId: 1,
      stimulusId: 1,
      aoiId: 1,
      number: 1,
    },
  }),
);

Meteor.publish('visits.byParams.withGazepoints', params => Visits.find(params));

Meteor.publish('visits.byAnalysisIdWithGazepoints', analysisId => {
  check(analysisId, String);
  return Visits.find({ analysisId });
});

Meteor.publish('visits.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Visits.find({ analysisId, aoiId }, { fields: { gazepoints: 0 } });
});

Meteor.publish('visits.byParticipantId', participantId => {
  check(participantId, String);
  return Visits.find({ participantId }, { fields: { gazepoints: 0 } });
});
