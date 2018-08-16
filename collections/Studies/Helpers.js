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
  allDatafilesProcessed() {
    datafilesArr = Datafiles.find({ _id: { $in: this.datafileIds }}).fetch();

    if(datafilesArr.length) {
      return datafilesArr.every(function(datafile) {
        return datafile.processed;
      });
    } else {
      return false;
    }
  },
});
