////////////////////////////////////////////////////////////////////////////////
// Gazepoints Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('gazepoints.all', function() {
  return Gazepoints.find({});
});

Meteor.publish('gazepoints.single', function(id) {
  check(id, String);
  return Gazepoints.find({_id: id});
});

Meteor.publish('gazepoints.byStudyId', (studyId) => {
  check(studyId, String);
  return Gazepoints.find({ studyId: studyId });
});

Meteor.publish('gazepoints.byViewingId', (viewingId) => {
  check(viewingId, String);
  viewing = Viewings.findOne(viewingId);
  return Gazepoints.find({ _id: { $in: viewing.gazepointIds }},
    { sort: { timestamp: 1 }});
});

Meteor.publish('gazepoints.forPlotHulls.byViewingId', (viewingId) => {
  check(viewingId, String);
  viewing = Viewings.findOne(viewingId);
  return Gazepoints.find({ _id: { $in: viewing.gazepointIds }},
    { fields: {
      timestamp: 1,
      fixationIndex: 1,
      x: 1,
      y: 1
    }},
    { sort: { timestamp: 1 }}
  );
});

Meteor.publish('gazepoints.byStimulusId', (stimulusId) => {
  check(stimulusId, String);
  return Gazepoints.find({ stimulusId: stimulusId });
});
