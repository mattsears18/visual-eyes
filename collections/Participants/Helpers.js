import Participants from './Participants';

Participants.helpers({
  hasPermission(action) {
    check(action, String);

    return true; //TODO actually make this work

    if(this.userPermissions) {
      userIds = this.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
});
