import Aois from './Aois';

Aois.helpers({
  hasPermission(action) {
    check(action, String);

    return true; //TODO actually make this work

    study = Studies.findOne(this.studyId);

    if(study && study.userPermissions) {
      userIds = study.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  stimulus() {
    return Stimuli.findOne( this.stimulusId );
  },
  gazepoints() {
    return Gazepoints.find({ aoiId: this._id });
  }
});
