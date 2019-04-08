import process from './helpers/process';

Variablefiles.collection.helpers({
  process,
  study() {
    return Studies.findOne({ _id: this.studyId });
  },
});
