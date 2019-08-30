import { Factory } from 'meteor/dburles:factory';
import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getPointTrailTrace()', () => {
  it('gets the initial point trail trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointTrailTrace({
      initial: true,
      hullIndex: 7,
    });

    expect(trace.name).to.equal('Last 10 Gaze Points');
    expect(trace.x).to.eql([400, 500, 600, 700, 800, 900, 100, 200, 300, 400]);
    expect(trace.y).to.eql([100, 700, 600, 500, 400, 300, 200, 100, 400, 300]);
  });

  it('gets a point trail trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointTrailTrace({
      initial: false,
      hullIndex: 9,
    });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([600, 700, 800, 900, 100, 200, 300, 400, 500, 600]);
    expect(trace.y).to.eql([600, 500, 400, 300, 200, 100, 400, 300, 200, 100]);
  });
});
