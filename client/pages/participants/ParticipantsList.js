Template.ParticipantsList.helpers({
  study: () => {
    return Studies.findOne();
  },
  participants: () => {
    return Participants.find({}, { sort: { name: 1 }});
  },
});
