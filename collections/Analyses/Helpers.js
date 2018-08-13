import Analyses from './Analyses';

Analyses.helpers({
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
  aois() {
    return Aois.find({ _id: { $in: this.analysisIds }});
  },
  datafiles() {
    return Datafiles.collection.find({ _id: { $in: this.datafileIds }});
  },
});
