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
  hasNoDatafiles() {
    if(this.datafileIds.length) {
      // has datafiles
      return false;
    } else {
      // does not have datafiles
      return true;
    }
  },
  analysesCount() {
    return Analyses.find({ studyId: this._id }).count();
  },
  analysesProcessedCount() {
    return Analyses.find({ studyId: this._id, status: 'processed' }).count();
  },
  analysesProcessingComplete() {
    return (this.analysesCount() > 0 && (this.analysesProcessedCount() == this.analysesCount()));
  },
  datafilesCount() {
    return Datafiles.find({ studyId: this._id }).count();
  },
  datafilesProcessedCount() {
    return Datafiles.find({ studyId: this._id, status: 'processed' }).count();
  },
  datafilesProcessingComplete() {
    return (this.datafilesCount() > 0 && (this.datafilesProcessedCount() == this.datafilesCount()));
  },
});
