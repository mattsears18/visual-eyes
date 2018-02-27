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
    return Datafiles.find({_id: {$in: this.datafileIds}}, {sort: {name: 1}});
  },
  allDatafilesProcessed() {
    processed = true;

    datafiles = Datafiles.find({_id: {$in: this.datafileIds}});

    datafiles.forEach(function(datafile) {
      if(datafile.processed != true) {
        processed = false;
      }
    });

    return processed;
  },
  totalRecordings() {
    recordings = 0;

    datafiles = Datafiles.find({_id: {$in: this.datafileIds}});

    datafiles.forEach(function(datafile) {
      if(datafile.recordings) {
        recordings += datafile.recordings;
      }
    });

    return recordings;
  },
  totalRecordingsProcessed() {
    recordings = 0;

    datafiles = Datafiles.find({_id: {$in: this.datafileIds}});

    datafiles.forEach(function(datafile) {
      if(datafile.recordingsProcessed) {
        recordings += datafile.recordingsProcessed;
      }
    });

    return recordings;
  },
  percentRecordingsProcessed() {
    percent = 0;

    if(this.totalRecordingsProcessed() && this.totalRecordings()) {
      percent = (this.totalRecordingsProcessed() / this.totalRecordings() * 100);
    }

    return Math.round(percent * 100) / 100 //round to 2 decimal places
  },
});
