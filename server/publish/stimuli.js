////////////////////////////////////////////////////////////////////////////////
// Stimuli Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('stimuli.all', () => {
  return Stimuli.find({});
});

Meteor.publish('stimuli.single', function(id) {
  check(id, String);
  return Stimuli.find({_id: id});
});

Meteor.publish('stimuli.byStudyId', (studyId) => {
  check(studyId, String);
  return Stimuli.find({ studyId: studyId }, { sort: { name: 1 }});
});

Meteor.publish('stimuli.byAoiId', function(aoiId) {
  check(aoiId, String);
  aoi = Aois.findOne({_id: aoiId});
  return Stimuli.find({_id: aoi.stimulusId});
});

Meteor.publish('stimuli.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Stimuli.find({_id: viewing.stimulusId});
});

Meteor.publish('stimuli.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({_id: analysisId});
  return Stimuli.find({ _id: { $in: analysis.stimulusIds }},
    { sort: { name: 1 }});
});
