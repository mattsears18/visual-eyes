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
  datafiles() {
    return Datafiles.find({ _id: { $in: this.datafileIds }}).cursor;
  },
  aois() {
    return Aois.find({studyId: this._id});
  },
  datafilesProcessedCount() {
    return Datafiles.find({
      _id: { $in: this.datafileIds },
      processed: true,
    }).count();
  },
  hasNoDatafiles() {
    if(this.datafileIds.length) {
      // has datafiles
      return false;
    } else {
      // does not have datafiles
      return true;
    }
  },
});
