// import VisitHullSeries from '../VisitHullSeries';
// import defaultTestFixations from '../../../../defaultTestFixations';

// require('../../../../factories.test');
// const { expect } = require('chai');

// describe('VisitHullSeries.getCentroidTrailTrace()', () => {
//   it('gets the initial centroid trail trace', () => {
//     const hullseries = new VisitHullSeries({
//       visit: Factory.create('visit', { fixations: defaultTestFixations }),
//       period: 5000,
//     });

//     const trace = hullseries.getCentroidTrailTrace({ initial: true });

//     expect(trace.name).to.equal('Centroid Trail');
//     expect(trace.x).to.eql([-10, -11]);
//     expect(trace.y).to.eql([-10, -11]);
//   });

//   it('gets a centroid trail trace (not initial) for the first 5 hulls', () => {
//     const hullseries = new VisitHullSeries({
//       visit: Factory.create('visit', { fixations: defaultTestFixations }),
//       period: 5000,
//     });

//     const trace = hullseries.getCentroidTrailTrace({
//       initial: false,
//       hullIndex: 4,
//     });

//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([375, 450, 525, 600, 500]);
//     expect(trace.y).to.eql([
//       416.6666666666667,
//       400,
//       383.3333333333333,
//       366.6666666666667,
//       400,
//     ]);
//   });

//   it('gets the centroid trail trace (not initial) for the first hull', () => {
//     const hullseries = new VisitHullSeries({
//       visit: Factory.create('visit', { fixations: defaultTestFixations }),
//       period: 5000,
//     });

//     const trace = hullseries.getCentroidTrailTrace({
//       initial: false,
//       hullIndex: 0,
//     });

//     expect(trace.name).to.be.an('undefined');
//     expect(trace.x).to.eql([-10, -11]);
//     expect(trace.y).to.eql([-10, -11]);
//   });
// });
