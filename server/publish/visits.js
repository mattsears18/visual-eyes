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

Meteor.publish('visits.byStudyId', (studyId) => {
  check(studyId, String);
  return Visits.find({ studyId }, { fields: { gazepoints: 0 } });
});

// Meteor.publish('visits.byAnalysisId', (analysisId) => {
//   check(analysisId, String);
//   return Visits.find({ analysisId }, { fields: { gazepoints: 0 } });
// });

Meteor.publish('visits.byAnalysisId', (analysisId) => {
  check(analysisId, String);
  return Visits.find(
    { analysisId },
    {
      fields: {
        _id: 1,
        participantId: 1,
        aoiId: 1,
        stimulusId: 1,
        number: 1,
        duration: 1,
      },
    },
  );
});

Meteor.publish('visits.simple.byAnalysisId', (analysisId) => {
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

Meteor.publish('visits.simple.byParams', params => Visits.find(params, {
  fields: {
    participantId: 1,
    stimulusId: 1,
    aoiId: 1,
    number: 1,
  },
}));

Meteor.publish('visits.byParams.withGazepoints', params => Visits.find(params));

Meteor.publish('visits.byAnalysisIdWithGazepoints', (analysisId) => {
  check(analysisId, String);
  return Visits.find({ analysisId });
});

Meteor.publish('visits.byAnalysisIdAoiId', (analysisId, aoiId) => {
  check(analysisId, String);
  check(aoiId, String);
  return Visits.find({ analysisId, aoiId }, { fields: { gazepoints: 0 } });
});

Meteor.publish('visits.byParticipantId', (participantId) => {
  check(participantId, String);
  return Visits.find({ participantId }, { fields: { gazepoints: 0 } });
});
