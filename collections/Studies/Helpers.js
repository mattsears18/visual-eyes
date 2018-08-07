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
    return Datafiles.find({ _id: { $in: this.datafileIds }});
  },
  aois() {
    return Aois.find({studyId: this._id});
  },
  // allDatafilesProcessed() {
  //   processed = true;
  //
  //   datafiles = Datafiles.find({studyId: this._id});
  //
  //   datafiles.forEach(function(datafile) {
  //     if(datafile.processed != true) {
  //       processed = false;
  //     }
  //   });
  //
  //   return processed;
  // },
  // totalRecordings() {
  //   recordings = 0;
  //
  //   datafiles = Datafiles.find({studyId: this._id});
  //
  //   datafiles.forEach(function(datafile) {
  //     if(datafile.recordings) {
  //       recordings += datafile.recordings;
  //     }
  //   });
  //
  //   return recordings;
  // },
  //These are garbage functions - recordings aren't created until they're "processed" so all recordings are always 100% processed
  // totalRecordingsProcessed() {
  //   recordings = 0;
  //
  //   datafiles = Datafiles.find({studyId: this._id});
  //
  //   datafiles.forEach(function(datafile) {
  //     if(datafile.recordingsProcessed) {
  //       recordings += datafile.recordingsProcessed;
  //     }
  //   });
  //
  //   return recordings;
  // },
  // percentRecordingsProcessed() {
  //   percent = 0;
  //
  //   if(this.totalRecordingsProcessed() && this.totalRecordings()) {
  //     percent = (this.totalRecordingsProcessed() / this.totalRecordings() * 100);
  //   }
  //
  //   return Math.round(percent * 100) / 100 //round to 2 decimal places
  // },

  totalDatafiles() {
    return this.datafiles().count();
  },
  totalDatafilesProcessed() {
    processed = 0;
    this.datafiles().forEach(function(datafile) {
      if(datafile.recordingsProcessed) {
        processed += 1;
      }
    });

    return processed;
  },
  percentDatafilesProcessed() {
    percent = 0;

    if(this.totalDatafiles && this.totalDatafilesProcessed) {
      percent = (this.totalDatafilesProcessed() / this.totalDatafiles() * 100);
    }

    return Math.round(percent * 100) / 100 //round to 2 decimal places
  }
});
