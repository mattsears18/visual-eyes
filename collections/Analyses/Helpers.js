import Analyses from './Analyses';

Analyses.helpers({
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
  aois() {
    return Aois.find({ _id: { $in: this.analysisIds }});
  },
  participants() {
    return Participants.collection.find({ _id: { $in: this.participantIds }});
  },
});
