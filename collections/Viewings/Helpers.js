import Viewings from './Viewings';

Viewings.helpers({
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
    return Datafiles.findOne(this.datafileId);
  },
  datafileName() {
    return this.datafile().name;
  },
  aoi() {
    return Aois.findOne(this.aoiId);
  },
  aoiName() {
    return this.aoi().name;
  },
});
