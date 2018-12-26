Meteor.methods({
  'viewings.getMaxTime'({ viewing }) {
    max = Recordings.findOne({ _id: { $in: viewing.recordingIds }},
      { sort: { recordingTime: -1 }});

    return max.recordingTime;
  },
});
