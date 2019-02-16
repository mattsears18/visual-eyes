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
  return Stimuli.find({ studyId: studyId });
});

Meteor.publish('stimuli.byAoiId', function(aoiId) {
  check(aoiId, String);
  aoi = Aois.findOne({_id: aoiId});
  return Stimuli.find({_id: aoi.stimulusId});
});

Meteor.publish('stimuli.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Stimuli.find({_id: viewing.aoi().stimulusId});
});
