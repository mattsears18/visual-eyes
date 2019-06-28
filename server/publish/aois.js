// //////////////////////////////////////////////////////////////////////////////
// Aois Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('aois.all', function() {
  return Aois.find({});
});

Meteor.publish('aois.single', function(id) {
  check(id, String);
  return Aois.find({ _id: id });
});

Meteor.publish('aois.byStudyId', (studyId) => {
  check(studyId, String);
  return Aois.find({ studyId },
    { sort: { name: 1 } });
});

Meteor.publish('aois.byGazeId', function(gazeId) {
  check(gazeId, String);
  gaze = Gazes.findOne({ _id: gazeId });
  return Aois.find({ _id: { $in: gaze.aoiIds } });
});

Meteor.publish('aois.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({ _id: analysisId });
  return Aois.find({ stimulusId: { $in: analysis.stimulusIds } },
    { sort: { name: 1 } });
});

Meteor.publish('aois.byStimulusId', function(stimulusId) {
  check(stimulusId, String);
  return Aois.find({ stimulusId },
    { sort: { name: 1 } });
});
