require('../../factories.test');
import PlotHullSeries from './PlotHullSeries';

describe('PlotHullSeries.constructor()', () => {
  it('has no viewing', () => {
    chai.expect(() => { new PlotHullSeries({}) }).to.throw('noViewing');
  });

  it('has a viewing with no gazepoints', () => {
    let viewing = Factory.create('viewing');
    chai.expect(() => { viewing.plotHullSeries({}) }).to.throw('noGazepoints');
  });
});
