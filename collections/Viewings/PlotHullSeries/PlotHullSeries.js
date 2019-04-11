import getEndGazepointIndex     from './imports/getEndGazepointIndex';
import getStartGazepointIndex   from './imports/getStartGazepointIndex';
import hulls                    from './imports/hulls';
import getAverageCoverage       from './imports/getAverageCoverage';
import getFrames                from './imports/getFrames';
import getInitialTraces         from './imports/getInitialTraces';
import getLayout                from './imports/getLayout';
import getCSV                   from './imports/getCSV';
import saveCSV                  from './imports/saveCSV';

export default class PlotHullSeries {
  getEndGazepointIndex = getEndGazepointIndex;
  getStartGazepointIndex = getStartGazepointIndex;
  hulls = hulls;
  getAverageCoverage = getAverageCoverage;
  getFrames = getFrames;
  getInitialTraces = getInitialTraces;
  getLayout = getLayout;
  getCSV = getCSV;
  saveCSV = saveCSV;

  constructor({
    viewing,
    instantContinuous = 'instant',
    slideStep,
    centroidPeriod,
    fixationTrailLength,
  }) {
    if(!viewing) { throw new Error('noViewing') }
    if(!viewing.gazepoints.length) { throw new Error('noGazepoints') }

    this.viewing = () => { return viewing; }
    this.instantContinuous = instantContinuous;
    this.slideStep = slideStep;
    this.centroidPeriod = centroidPeriod;
    this.fixationTrailLength = fixationTrailLength;
  }
}
