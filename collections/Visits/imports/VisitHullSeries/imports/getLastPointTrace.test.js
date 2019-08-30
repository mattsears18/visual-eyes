import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getLastPointTrace()', () => {
  it('gets the initial last point trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getLastPointTrace({ initial: true, hullIndex: 0 });

    expect(trace.name).to.equal('Last Fixation');
    expect(trace.x).to.eql([600]);
    expect(trace.y).to.eql([600]);
  });

  it('gets a last point trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getLastPointTrace({
      initial: false,
      hullIndex: 9,
    });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([600]);
    expect(trace.y).to.eql([100]);
  });
});
