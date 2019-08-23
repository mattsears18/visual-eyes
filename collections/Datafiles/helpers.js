import assignAois from './imports/assignAois';
import assignStimuli from './imports/assignStimuli';
import detectFileFormat from './imports/detectFileFormat';
import filterSortFloat from './imports/filterSortFloat';
import getGazepoints from './imports/getGazepoints';
import getName from './imports/getName';
import getNumericPositiveCoordinatesOnly from './imports/getNumericPositiveCoordinatesOnly';
import getRawCSV from './imports/getRawCSV';
import getRenamedRows from './imports/getRenamedRows';
import getStimuliOnly from './imports/getStimuliOnly';
import getVisualIntakesOnly from './imports/getVisualIntakesOnly';
import makeEyeevents from './imports/makeEyeevents';
import makeGazepoints from './imports/makeGazepoints';
import makeProcessJob from './imports/makeProcessJob';
import preProcess from './imports/preProcess';
import process from './imports/process';
import recomputeTimestamps from './imports/recomputeTimestamps';
import removeHeaders from './imports/removeHeaders';
import renameHeaders from './imports/renameHeaders';
import setFileFormat from './imports/setFileFormat';

Datafiles.collection.helpers({
  assignAois,
  assignStimuli,
  detectFileFormat,
  filterSortFloat,
  getGazepoints,
  getName,
  getNumericPositiveCoordinatesOnly,
  getRawCSV,
  getRenamedRows,
  getStimuliOnly,
  getVisualIntakesOnly,
  makeEyeevents,
  makeGazepoints,
  makeProcessJob,
  preProcess,
  process,
  recomputeTimestamps,
  removeHeaders,
  renameHeaders,
  setFileFormat,

  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
});
