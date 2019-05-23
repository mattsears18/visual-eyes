import process from './imports/process';

Variablefiles.collection.helpers({
  process,
  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
});
