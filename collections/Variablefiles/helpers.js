import process from './imports/process';

Variablefiles.collection.helpers({
  process,
  study() {
    return Studies.findOne({ _id: this.studyId });
  },
});
