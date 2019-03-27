import Participants from './Participants';

Participants.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

Participants.after.remove(function (userId, participant) {
  if(Meteor.isServer) {
    Gazepoints.remove({ participantId: participant._id });

    Analyses.update({ studyId: participant.studyId }, { $pull: { participantIds: participant._id }}, { multi: true }, (err, num) => {
      if(err) {
        console.log(err);
      }
    });
  }
});
