import reprocessAnalyses from './imports/reprocessAnalyses';
import reprocessDatafiles from './imports/reprocessDatafiles';
import getExportData from './imports/getExportData';
import saveCSV from './imports/saveCSV';
import makeDefaultAnalysesThatDontExist from './imports/makeDefaultAnalysesThatDontExist';
import removeIncompleteAnalyses from './imports/removeIncompleteAnalyses';
import Variables from '../Variables/Variables';
import Participants from '../Participants/Participants';

Studies.helpers({
  reprocessAnalyses,
  reprocessDatafiles,
  getExportData,
  saveCSV,
  makeDefaultAnalysesThatDontExist,
  removeIncompleteAnalyses,

  hasPermission(action) {
    check(action, String);

    if (this.userPermissions) {
      userIds = this.userPermissions[action];
      if (userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  datafiles() {
    return Datafiles.find({ studyId: this._id }).cursor;
  },
  aois() {
    return Aois.find({ studyId: this._id });
  },
  analyses() {
    return Analyses.find({ studyId: this._id });
  },
  analysesCount() {
    return Analyses.find({ studyId: this._id }).count();
  },
  analysesProcessedCount() {
    return Analyses.find({ studyId: this._id, status: 'processed' }).count();
  },
  analysesProcessingComplete() {
    return (
      this.analysesCount() > 0
      && this.analysesProcessedCount() === this.analysesCount()
    );
  },
  datafilesCount() {
    return Datafiles.find({ studyId: this._id }).count();
  },
  datafilesProcessedCount() {
    return Datafiles.find({ studyId: this._id, status: 'processed' }).count();
  },
  datafilesProcessingComplete() {
    return (
      this.datafilesCount() > 0
      && this.datafilesProcessedCount() === this.datafilesCount()
    );
  },
  stimuli() {
    return Stimuli.find({ studyId: this._id, name: { $ne: '-' } });
  },
  participants() {
    return Participants.find({ studyId: this._id });
  },
  stimuliWithImageCount() {
    return Stimuli.find({
      studyId: this._id,
      stimulusfileId: { $ne: null },
    }).count();
  },
  stimuliAllHaveImage() {
    return this.stimuli().count() === this.stimuliWithImageCount();
  },
  pointsType() {
    let pointsType = 'gazepoints';
    if (this.fixationsOnly) {
      pointsType = 'fixations';
    }
    return pointsType;
  },
  variables() {
    return Variables.find({ studyId: this._id });
  },
});
