import Studies from './Studies';

Studies.helpers({
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
  datafile() {
    datafileId = this.datafileId;

    if(datafileId) {
      return Datafiles.findOne({_id: datafileId});
    }
  },
});
