Gazepoints.helpers({
  hasPermission(action) {
    check(action, String);

    if (this.userPermissions) {
      userIds = this.userPermissions[action];
      if (userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  participant() {
    return this.participantId
      ? Participants.findOne(this.participantId)
      : undefined;
  },
  participantName() {
    return this.participant() ? this.participant().name : undefined;
  },
  study() {
    return this.studyId ? Studies.find({ _id: this.studyId }) : undefined;
  },
});
