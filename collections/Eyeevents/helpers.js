import getVideoTime from './imports/getVideoTime';

Eyeevents.helpers({
  getVideoTime,

  hasPermission(action) {
    check(action, String);

    if (this.userPermissions) {
      const userIds = this.userPermissions[action];
      if (userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  aoi() {
    return this.aoiId ? Aois.findOne({ _id: this.aoiId }) : undefined;
  },
  aoiName() {
    return this.aoi() ? this.aoi().name : undefined;
  },

  participant() {
    return this.participantId
      ? Participants.findOne({ _id: this.participantId })
      : undefined;
  },
  participantName() {
    return this.participant() ? this.participant().name : undefined;
  },
  stimulus() {
    return this.stimulusId
      ? Stimuli.findOne({ _id: this.stimulusId })
      : undefined;
  },
  stimulusName() {
    return this.stimulus() ? this.stimulus().name : undefined;
  },
});
