// //////////////////////////////////////////////////////////////////////////////
// Variables Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('variables.all', function() {
  return Variables.find({});
});

Meteor.publish('variables.single', function(id) {
  check(id, String);
  return Variables.find({ _id: id });
});

Meteor.publish('variables.byStudyId', (studyId) => {
  check(studyId, String);
  return Variables.find({ studyId },
    { sort: { name: 1 } });
});
//
// Meteor.publish('variables.byGazeId', function(gazeId) {
//   check(gazeId, String);
//   gaze = Gazes.findOne({_id: gazeId});
//   return Variables.find({_id: gaze.variableId});
// });
//
// Meteor.publish('variables.byAnalysisId', function(analysisId) {
//   check(analysisId, String);
//   analysis = Analyses.findOne({_id: analysisId});
//   return Variables.find({ _id: { $in: analysis.variableIds }},
//     { sort: { name: 1 }});
// });
