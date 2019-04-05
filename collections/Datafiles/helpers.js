import makeProcessJob                     from './helpers/makeProcessJob';
import getName                            from './helpers/getName';
import filterSortFloat                    from './helpers/filterSortFloat';
import removeHeaders                      from './helpers/removeHeaders';
import getRawCSV                          from './helpers/getRawCSV';
import detectFileFormat                   from './helpers/detectFileFormat';
import setFileFormat                      from './helpers/setFileFormat';
import renameHeaders                      from './helpers/renameHeaders';
import getRenamedRows                     from './helpers/getRenamedRows';
import getNumericPositiveCoordinatesOnly  from './helpers/getNumericPositiveCoordinatesOnly';
import getVisualIntakesOnly               from './helpers/getVisualIntakesOnly';
import getStimuliOnly                     from './helpers/getStimuliOnly';
import getNonDuplicateCoordinatesOnly     from './helpers/getNonDuplicateCoordinatesOnly';
import getGazepoints                      from './helpers/getGazepoints';
import getFixations                       from './helpers/getFixations';
import getPoints                          from './helpers/getPoints';
import makeGazepoints                     from './helpers/makeGazepoints';
import process                            from './helpers/process';

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
  getPoints,
  makeGazepoints,
  process,

  study() {
    return Studies.findOne({ _id: this.studyId });
  },
});
