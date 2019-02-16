import Stimuli from './Stimuli';
import Stimulusfiles from './Stimulusfiles/Stimulusfiles';

Stimuli.helpers({
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
  stimulusfile() {
    return Stimulusfiles.collection.findOne( this.stimulusfileId );
  },
});
