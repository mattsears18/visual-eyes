import Workpackages from './Workpackages';

Workpackages.helpers({
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
  dateStartFormatted() {
    return moment(this.dateStart);
  },
  dateFinishFormatted() {
    return moment(this.dateFinish).format('MM/DD/YY');
  },
});
