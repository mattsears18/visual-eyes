import Stimulusfiles from './Stimulusfiles/Stimulusfiles';
import setFixationsOnStimulus from './imports/setFixationsOnStimulus';

Stimuli.helpers({
  setFixationsOnStimulus,

  hasPermission(action) {
    check(action, String);
    return true;
  },
  stimulusfile() {
    return this.stimulusfileId
      ? Stimulusfiles.collection.findOne(this.stimulusfileId)
      : undefined;
  },
  area() {
    return this.height * this.width;
  },
  aoiCount() {
    return Aois.find({ stimulusId: this._id }).fetch().length;
  },
  aois() {
    return Aois.find({ stimulusId: this._id });
  },
  gazepoints() {
    return Gazepoints.find({ stimulusId: this._id });
  },
});
