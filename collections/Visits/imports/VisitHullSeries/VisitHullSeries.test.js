// import { Factory } from 'meteor/dburles:factory';
// import VisitHullSeries from './VisitHullSeries';

// require('../../../factories.test');
// const { expect } = require('chai');

// describe('VisitHullSeries', () => {
//   it('has no points', () => {
//     expect(() => {
//       new VisitHullSeries();
//     }).to.throw('noPoints');
//   });

//   it('has no visit', () => {
//     const points = [
//       { x: 100, y: 400, timestamp: 0 },
//       { x: 200, y: 300, timestamp: 1000 },
//       { x: 300, y: 200, timestamp: 2000 },
//       { x: 400, y: 100, timestamp: 3000 },
//     ];

//     expect(() => {
//       new VisitHullSeries({ points, period: 5000 });
//     }).to.throw('noVisit');
//   });

//   it('has a visit with no points', () => {
//     const visit = Factory.create('visit', { fixations: [] });
//     expect(() => {
//       new VisitHullSeries({ visit });
//     }).to.throw('noPoints');
//   });

//   it('has a visit with points', () => {
//     const points = [
//       {
//         x: 100,
//         y: 400,
//         timestamp: 0,
//         duration: 500,
//       },
//       {
//         x: 200,
//         y: 300,
//         timestamp: 1000,
//         duration: 500,
//       },
//       {
//         x: 300,
//         y: 200,
//         timestamp: 2000,
//         duration: 500,
//       },
//       {
//         x: 400,
//         y: 100,
//         timestamp: 3000,
//         duration: 500,
//       },
//     ];

//     const visit = Factory.create('visit', { fixations: points });
//     const hullseries = new VisitHullSeries({ visit, period: 5000 });

//     expect(hullseries.points).to.eql([
//       {
//         x: 100,
//         y: 400,
//         timestamp: 0,
//         duration: 500,
//       },
//       {
//         x: 200,
//         y: 300,
//         timestamp: 1000,
//         duration: 500,
//       },
//       {
//         x: 300,
//         y: 200,
//         timestamp: 2000,
//         duration: 500,
//       },
//       {
//         x: 400,
//         y: 100,
//         timestamp: 3000,
//         duration: 500,
//       },
//     ]);
//   });

//   it('is a VisitHullSeries', () => {
//     const visit = Factory.create('visit');
//     const hullseries = new VisitHullSeries({ visit, period: 5000 });

//     expect(hullseries.constructor.name).to.equal('VisitHullSeries');
//   });

//   it('overrides the points', () => {
//     const points = [
//       {
//         x: 100,
//         y: 400,
//         timestamp: 0,
//         duration: 500,
//       },
//       {
//         x: 200,
//         y: 300,
//         timestamp: 1000,
//         duration: 500,
//       },
//       {
//         x: 300,
//         y: 200,
//         timestamp: 2000,
//         duration: 500,
//       },
//       {
//         x: 400,
//         y: 100,
//         timestamp: 3000,
//         duration: 500,
//       },
//     ];

//     const otherPoints = [
//       {
//         x: 700,
//         y: 500,
//         timestamp: 6000,
//         duration: 500,
//       },
//       {
//         x: 800,
//         y: 400,
//         timestamp: 7000,
//         duration: 500,
//       },
//       {
//         x: 900,
//         y: 300,
//         timestamp: 8000,
//         duration: 500,
//       },
//       {
//         x: 100,
//         y: 200,
//         timestamp: 9000,
//         duration: 500,
//       },
//       {
//         x: 200,
//         y: 100,
//         timestamp: 10000,
//         duration: 500,
//       },
//     ];

//     const visit = Factory.create('visit', { fixations: points });
//     const hullseries = new VisitHullSeries({
//       visit,
//       period: 5000,
//       points: otherPoints,
//     });

//     expect(hullseries.points).to.eql([
//       {
//         x: 700,
//         y: 500,
//         timestamp: 6000,
//         duration: 500,
//       },
//       {
//         x: 800,
//         y: 400,
//         timestamp: 7000,
//         duration: 500,
//       },
//       {
//         x: 900,
//         y: 300,
//         timestamp: 8000,
//         duration: 500,
//       },
//       {
//         x: 100,
//         y: 200,
//         timestamp: 9000,
//         duration: 500,
//       },
//       {
//         x: 200,
//         y: 100,
//         timestamp: 10000,
//         duration: 500,
//       },
//     ]);
//   });
// });
