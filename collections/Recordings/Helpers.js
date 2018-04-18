import Recordings from './Recordings';

Recordings.helpers({
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
  study() {
    return Studies.find({_id: this.studyId});
  },
});
