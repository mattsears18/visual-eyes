// //////////////////////////////////////////////////////////////////////////////
// Stimulusfiles Publications
// //////////////////////////////////////////////////////////////////////////////
Meteor.publish('stimulusfiles.all', () => {
  return Stimulusfiles.collection.find({});
});

Meteor.publish('stimulusfiles.byStimulusId', (stimulusId) => {
  check(stimulusId, String);
  stimulus = Stimuli.findOne(stimulusId);

  if(stimulus) {
    return Stimulusfiles.find({ _id: stimulus.stimulusfileId }).cursor;
  }
});

Meteor.publish('stimulusfiles.byAoiId', (aoiId) => {
  check(aoiId, String);
  aoi = Aois.findOne(aoiId);

  if(aoi && aoi.stimulusId) {
    stimulus = Stimuli.findOne(aoi.stimulusId)
    if(stimulus) {
      return Stimulusfiles.find({ _id: stimulus.stimulusfileId }).cursor;
    }
  }
});

Meteor.publish('stimulusfiles.byViewingId', function(viewingId) {
  check(viewingId, String);
  viewing = Viewings.findOne({_id: viewingId});
  if(viewing && viewing.aoi() && viewing.aoi().stimulus()) {
    return Stimulusfiles.find({_id: viewing.aoi().stimulus().stimulusfileId}).cursor;
  }
});
