import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getPolygonTrace()', () => {
  it('gets the initial polygon trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPolygonTrace({ initial: true, hullIndex: 0 });

    expect(trace.name).to.equal('Convex Hull');
    expect(trace.x).to.eql([600, 500, 100, 400, 600]);
    expect(trace.y).to.eql([600, 700, 400, 100, 600]);
  });

  it('gets a polygon trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPolygonTrace({ initial: false, hullIndex: 9 });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([600, 300, 100, 200, 600]);
    expect(trace.y).to.eql([100, 400, 200, 100, 100]);
  });
});
