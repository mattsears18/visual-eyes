////////////////////////////////////////////////////////////////////////////////
// Participants Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('participants.all', function() {
  return Participants.find({});
});

Meteor.publish('participants.single', function(id) {
  check(id, String);
  return Participants.find({_id: id});
});

Meteor.publish('participants.byStudyId', (studyId) => {
  check(studyId, String);
  return Participants.find({ studyId: studyId },
    { sort: { name: 1 }});
});

Meteor.publish('participants.byAnalysisId', function(analysisId) {
  check(analysisId, String);
  analysis = Analyses.findOne({_id: analysisId});
  return Participants.find({ _id: { $in: analysis.participantIds }},
    { sort: { name: 1 }});
});

Meteor.publish('participants.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  return Participants.find({_id: viewing.participantId});
});
