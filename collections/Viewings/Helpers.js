import Viewings from './Viewings';
import getHulls from './getHulls';

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
    if(this.datafile()) {
      return this.datafile().name;
    }
  },
  aoi() {
    return Aois.findOne(this.aoiId);
  },
  aoiName() {
    if(this.aoi()) {
      return this.aoi().name;
    }
  },
  studyId() {
    if(this.aoi()) {
      return this.aoi().studyId;
    }
  },
  analysis() {
    return Analyses.findOne(this.analysisId);
  },
  recordings() {
    return Recordings.find({ _id: { $in: this.recordingIds }});
  },
  getHulls() {
    return getHulls(this);
  }
});
