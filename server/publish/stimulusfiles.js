// //////////////////////////////////////////////////////////////////////////////
// Stimulusfiles Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('stimulusfiles.all', () => Stimulusfiles.collection.find({}));

Meteor.publish('stimulusfiles.byStimulusId', (stimulusId) => {
  check(stimulusId, String);
  stimulus = Stimuli.findOne(stimulusId);

  if (stimulus) {
    return Stimulusfiles.find({ _id: stimulus.stimulusfileId }).cursor;
  }
});

Meteor.publish('stimulusfiles.byAoiId', (aoiId) => {
  check(aoiId, String);
  aoi = Aois.findOne(aoiId);

  if (aoi && aoi.stimulusId) {
    stimulus = Stimuli.findOne(aoi.stimulusId);
    if (stimulus) {
      return Stimulusfiles.find({ _id: stimulus.stimulusfileId }).cursor;
    }
  }
});

Meteor.publish('stimulusfiles.byGazeId', function(gazeId) {
  check(gazeId, String);
  gaze = Gazes.findOne({ _id: gazeId });
  if (gaze && gaze.stimulus() && gaze.stimulus().stimulusfileId) {
    return Stimulusfiles.find({ _id: gaze.stimulus().stimulusfileId }).cursor;
  }
});

Meteor.publish('stimulusfiles.byStudyId', function(studyId) {
  check(studyId, String);

  stimuli = Stimuli.find({ studyId });

  if (stimuli) {
    ids = stimuli.map(stimulus => stimulus.stimulusfileId);
    ids = ids.filter(el => el != null);

    if (ids) {
      return Stimulusfiles.find({ _id: { $in: ids } }).cursor;
    }
  }
});
