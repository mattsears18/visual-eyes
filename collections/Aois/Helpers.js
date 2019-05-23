Aois.helpers({
  hasPermission(action) {
    check(action, String);
    return true;
  },
  stimulus() {
    return this.stimulusId ? Stimuli.findOne(this.stimulusId) : undefined;
  },
  gazepoints() {
    return Gazepoints.find({ aoiId: this._id });
  },
});
