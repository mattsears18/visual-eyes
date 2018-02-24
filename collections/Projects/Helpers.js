import Projects from './Projects';

Projects.helpers({
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
  place() {
    return Places.findOne({_id: this.placeId});
  },
  workpackages() {
    return Workpackages.find({projectId: this._id});
  },
  submittals() {
    return Submittals.find({projectId: this._id});
  },
  drawings() {
    return Drawings.find({projectId: this._id});
  },
  specifications() {
    return Specifications.find({projectId: this._id});
  },
});
