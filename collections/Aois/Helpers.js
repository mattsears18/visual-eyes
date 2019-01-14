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
  image() {
    return Images.findOne( this.imageId );
  },
});
