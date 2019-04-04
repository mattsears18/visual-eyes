import makeProcessJob           from './helpers/makeProcessJob';
import removeHeaders            from './helpers/removeHeaders';
import detectFormat             from './helpers/detectFormat';
import * as getPointsFunctions  from './helpers/getPoints';
import makeGazepoints           from './helpers/makeGazepoints';
import getName                  from './helpers/getName';
import process                  from './helpers/process';

Datafiles.collection.helpers({
  makeProcessJob,
  removeHeaders,
  detectFormat,
  ...getPointsFunctions,
  makeGazepoints,
  getName,
  process,

  study() {
    return Studies.findOne({ _id: this.studyId });
  },
});
