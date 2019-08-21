import { Factory } from 'meteor/dburles:factory';
import VisitHullSeries from '../VisitHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getPointsTrace()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 },
    { x: 200, y: 300, timestamp: 1000 },
    { x: 300, y: 200, timestamp: 2000 },
    { x: 400, y: 100, timestamp: 3000 },
    { x: 500, y: 700, timestamp: 4000 },
    { x: 600, y: 600, timestamp: 5000 },
    { x: 700, y: 500, timestamp: 6000 },
    { x: 800, y: 400, timestamp: 7000 },
    { x: 900, y: 300, timestamp: 8000 },
    { x: 100, y: 200, timestamp: 9000 },
    { x: 200, y: 100, timestamp: 10000 },
    { x: 300, y: 400, timestamp: 11000 },
    { x: 400, y: 300, timestamp: 12000 },
    { x: 500, y: 200, timestamp: 13000 },
    { x: 600, y: 100, timestamp: 14000 },
  ];

  it('gets fixations', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visitWithGazepoints', {
        analysisId: Factory.create('analysis', { fixationsOnly: true })._id,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: true, hullIndex: 3 });
    expect(trace.name).to.equal('Fixations');
  });

  it('gets the initial points trace', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study', { fixationsOnly: false })._id,
        gazepoints: points,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: true, hullIndex: 0 });

    expect(trace.name).to.equal('Gaze Points');
    expect(trace.x).to.eql([100, 200, 300, 400, 500, 600]);
    expect(trace.y).to.eql([400, 300, 200, 100, 700, 600]);
  });

  it('gets a points trace (not initial)', () => {
    const hullseries = new VisitHullSeries({
      visit: Factory.create('visit', {
        studyId: Factory.create('study', { fixationsOnly: false })._id,
        gazepoints: points,
      }),
      period: 5000,
    });

    const trace = hullseries.getPointsTrace({ initial: false, hullIndex: 3 });

    expect(trace.name).to.be.an('undefined');
    expect(trace.x).to.eql([400, 500, 600, 700, 800, 900]);
    expect(trace.y).to.eql([100, 700, 600, 500, 400, 300]);
  });
});
