import makeProcessJob from './imports/makeProcessJob';
import getName from './imports/getName';
import filterSortFloat from './imports/filterSortFloat';
import removeHeaders from './imports/removeHeaders';
import getRawCSV from './imports/getRawCSV';
import detectFileFormat from './imports/detectFileFormat';
import setFileFormat from './imports/setFileFormat';
import renameHeaders from './imports/renameHeaders';
import getRenamedRows from './imports/getRenamedRows';
import getNumericPositiveCoordinatesOnly from './imports/getNumericPositiveCoordinatesOnly';
import getVisualIntakesOnly from './imports/getVisualIntakesOnly';
import getStimuliOnly from './imports/getStimuliOnly';
import getNonDuplicateCoordinatesOnly from './imports/getNonDuplicateCoordinatesOnly';
import getGazepoints from './imports/getGazepoints';
import getFixations from './imports/getFixations';
import makeGazepoints from './imports/makeGazepoints';
import process from './imports/process';

Datafiles.collection.helpers({
  makeProcessJob,
  getName,
  filterSortFloat,
  removeHeaders,
  getRawCSV,
  detectFileFormat,
  setFileFormat,
  renameHeaders,
  getRenamedRows,
  getNumericPositiveCoordinatesOnly,
  getVisualIntakesOnly,
  getStimuliOnly,
  getNonDuplicateCoordinatesOnly,
  getGazepoints,
  getFixations,
  makeGazepoints,
  process,

  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
});
