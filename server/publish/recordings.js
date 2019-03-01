////////////////////////////////////////////////////////////////////////////////
// Recordings Publications
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('recordings.all', function() {
  return Recordings.find({});
});

Meteor.publish('recordings.single', function(id) {
  check(id, String);
  return Recordings.find({_id: id});
});

Meteor.publish('recordings.byStudyId', (studyId) => {
  check(studyId, String);
  return Recordings.find({ studyId: studyId });
});

Meteor.publish('recordings.byViewingId', (viewingId) => {
  check(viewingId, String);
  viewing = Viewings.findOne(viewingId);
  return Recordings.find({ _id: { $in: viewing.recordingIds }},
    { sort: { recordingTime: 1 }});
});

Meteor.publish('recordings.byStimulusId', (stimulusId) => {
  check(stimulusId, String);
  return Recordings.find({ stimulusId: stimulusId });
});
