import Gazepoints from './Gazepoints';

Gazepoints.helpers({
  hasPermission(action) {
    check(action, String);

    if(this.userPermissions) {
      userIds = this.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  participant() {
    return Participants.findOne(this.participantId);
  },
  participantName() {
    return this.participant().name;
  },
  study() {
    return Studies.find({_id: this.studyId});
  },
});
