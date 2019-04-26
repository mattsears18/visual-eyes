import Stimulusfiles          from './Stimulusfiles/Stimulusfiles';

Stimuli.helpers({
  hasPermission(action) {
    check(action, String);

    return true;

    study = Studies.findOne(this.studyId);

    if(study && study.userPermissions) {
      userIds = study.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  stimulusfile() {
    return Stimulusfiles.collection.findOne( this.stimulusfileId );
  },
  area() {
    return (this.height * this.width);
  },
  aoiCount() {
    return Aois.find({ stimulusId: this._id }).fetch().length;
  },
  aois() {
    return Aois.find({ stimulusId: this._id });
  },
  gazepoints() {
    return Gazepoints.find({ stimulusId: this._id });
  }
});
