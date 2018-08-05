Meteor.methods({
  'viewings.getMinTime'({ viewing }) {
    min = Recordings.findOne({ _id: { $in: viewing.recordingIds }},
      { sort: { recordingTime: 1 }});
      
    return min.recordingTime;
  },
});
