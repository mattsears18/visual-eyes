Template.ParticipantsList.helpers({
  study: () => Studies.findOne(),
  participants: () => Participants.find({}, { sort: { name: 1 } }),
});
