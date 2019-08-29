import getDuration from './imports/getDuration';

Eyeevents.helpers({
  getDuration,

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
});
