import Datafiles from './Datafiles';

Datafiles.collection.helpers({
  study() {
    return Studies.findOne({ datafileIds: this._id });
  },
});
