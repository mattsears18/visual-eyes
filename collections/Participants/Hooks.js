import Participants from './Participants';

Participants.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});


Participants.after.remove(function (userId, participant) {
  if(Meteor.isServer) {
    Recordings.remove({ participantId: participant._id });
  }
});
