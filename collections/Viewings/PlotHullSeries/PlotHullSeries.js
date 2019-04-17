import getEndGazepointIndex     from './imports/getEndGazepointIndex';
import getStartGazepointIndex   from './imports/getStartGazepointIndex';
import getHulls                 from './imports/getHulls';
import getAverageCoverage       from './imports/getAverageCoverage';
import getTraces                from './imports/getTraces';
import getLayout                from './imports/getLayout';
import getCSV                   from './imports/getCSV';
import saveCSV                  from './imports/saveCSV';
import getCentroids             from './imports/getCentroids';
import getCentroidTrailTrace    from './imports/getCentroidTrailTrace';

export default class PlotHullSeries {
  getEndGazepointIndex = getEndGazepointIndex;
  getStartGazepointIndex = getStartGazepointIndex;
  getHulls = getHulls;
  getAverageCoverage = getAverageCoverage;
  getTraces = getTraces;
  getLayout = getLayout;
  getCSV = getCSV;
  saveCSV = saveCSV;
  getCentroids = getCentroids;
  getCentroidTrailTrace = getCentroidTrailTrace;

  constructor({
    viewing,
    instantContinuous = 'instant',
    slideStep,
    centroidPeriod,
    fixationTrailLength = 40,
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
