import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getCentroidTrace()', () => {
  it('gets the initial centroid trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    const trace = hullseries.getCentroidTrace({ initial: true, hullIndex: 0 });

    expect(trace.name).to.equal('Centroid');
    expect(trace.x).to.eql([375]);
    expect(trace.y).to.eql([416 + 2 / 3]);
  });

  it('gets a centroid trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', { fixations: defaultTestFixations }),
      period: 5000,
    });

    const trace = hullseries.getCentroidTrace({ initial: false, hullIndex: 3 });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([600]);
    expect(trace.y).to.eql([366 + 2 / 3]);
  });
});
