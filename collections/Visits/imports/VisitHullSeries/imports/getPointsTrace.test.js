import { Factory } from 'meteor/dburles:factory';
import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getPointsTrace()', () => {
  it('gets fixations', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        analysisId: Factory.create('analysis')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: true, hullIndex: 3 });
    expect(trace.name).to.equal('Fixations');
  });

  it('gets the initial points trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study')._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: true, hullIndex: 0 });

    expect(trace.x).to.eql([100, 200, 300, 400, 500, 600]);
    expect(trace.y).to.eql([400, 300, 200, 100, 700, 600]);
  });

  it('gets a points trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study', { fixationsOnly: false })._id,
        fixations: defaultTestFixations,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: false, hullIndex: 3 });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([400, 500, 600, 700, 800, 900]);
    expect(trace.y).to.eql([100, 700, 600, 500, 400, 300]);
  });
});
