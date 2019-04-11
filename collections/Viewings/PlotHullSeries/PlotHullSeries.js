import getEndGazepointIndex     from './helpers/getEndGazepointIndex';
import getStartGazepointIndex   from './helpers/getStartGazepointIndex';
import hulls                    from './helpers/hulls';
import getAverageCoverage       from './helpers/getAverageCoverage';
import getFrames                from './helpers/getFrames';
import getInitialTraces         from './helpers/getInitialTraces';
import getLayout                from './helpers/getLayout';
import getCSV                   from './helpers/getCSV';
import saveCSV                  from './helpers/saveCSV';

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
    this.viewing = () => { return viewing; }
    this.instantContinuous = instantContinuous;
    this.slideStep = slideStep;
    this.centroidPeriod = centroidPeriod;
    this.fixationTrailLength = fixationTrailLength;
  }
}
