// //////////////////////////////////////////////////////////////////////////////
// Stimuli Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('stimuli.all', () => Stimuli.find({}));

Meteor.publish('stimuli.single', function(id) {
  check(id, String);
  return Stimuli.find({ _id: id });
});

Meteor.publish('stimuli.byStudyId', (studyId) => {
  check(studyId, String);
  return Stimuli.find({ studyId, name: { $ne: '-' } }, { sort: { name: 1 } });
});

Meteor.publish('stimuli.byAoiId', function(aoiId) {
  check(aoiId, String);
  aoi = Aois.findOne({ _id: aoiId });
  return Stimuli.find({ _id: aoi.stimulusId });
});

Meteor.publish('stimuli.byVisitId', function(visitId) {
  check(visitId, String);
  visit = Visits.findOne({ _id: visitId });
  return Stimuli.find({ _id: visit.stimulusId });
});

Meteor.publish('stimuli.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({ _id: analysisId });
  if (analysis) {
    return Stimuli.find(
      { _id: { $in: analysis.stimulusIds } },
      { sort: { name: 1 } },
    );
  }
});
