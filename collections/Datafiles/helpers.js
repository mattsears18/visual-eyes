import assignAois from './imports/assignAois';
import assignStimuli from './imports/assignStimuli';
import detectFileFormat from './imports/detectFileFormat';
import filterSortFloat from './imports/filterSortFloat';
import generateImotionsEyeevents from './imports/generateImotionsEyeevents';
import generateSMIEyeevents from './imports/generateSMIEyeevents';
import getAssignedRows from './imports/getAssignedRows';
// import getGazepoints from './imports/getGazepoints';
import getName from './imports/getName';
import getValidCoordinatesOnly from './imports/getValidCoordinatesOnly';
import getRawCSV from './imports/getRawCSV';
import getRenamedRows from './imports/getRenamedRows';
import getStimuliOnly from './imports/getStimuliOnly';
import getVisualIntakesOnly from './imports/getVisualIntakesOnly';
import groupRowsByStimulus from './imports/groupRowsByStimulus';
import makeEyeevents from './imports/makeEyeevents';
// import makeGazepoints from './imports/makeGazepoints';
import makeProcessJob from './imports/makeProcessJob';
import preProcess from './imports/preProcess';
import process from './imports/process';
import removeHeaders from './imports/removeHeaders';
import setFileFormat from './imports/setFileFormat';

Datafiles.collection.helpers({
  assignAois,
  assignStimuli,
  detectFileFormat,
  filterSortFloat,
  generateImotionsEyeevents,
  generateSMIEyeevents,
  getAssignedRows,
  // getGazepoints,
  getName,
  getValidCoordinatesOnly,
  getRawCSV,
  getRenamedRows,
  getStimuliOnly,
  getVisualIntakesOnly,
  groupRowsByStimulus,
  makeEyeevents,
  // makeGazepoints,
  makeProcessJob,
  preProcess,
  process,
  removeHeaders,
  setFileFormat,

  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
  getPathFilename() {
    if (Meteor.isDevelopment) {
      return this.path;
    }
    return `${this._storagePath}/${this._id}`;
  },
});
