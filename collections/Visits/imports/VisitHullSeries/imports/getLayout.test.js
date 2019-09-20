// import { Factory } from 'meteor/dburles:factory';
// import VisitHullSeries from '../VisitHullSeries';

// require('../../../../factories.test');
// const { expect } = require('chai');

// describe('VisitHullSeries.getLayout()', () => {
//   it('has no stimulusfile', () => {
//     const stimulus = Factory.create('stimulus', { stimulusfileId: 'abc' });

//     const aoi = Factory.create('aoi');
//     const visit = Factory.create('visit', {
//       aoiId: aoi._id,
//       stimulusId: stimulus._id,
//     });

//     const hullseries = new VisitHullSeries({
//       visit,
//       period: 5000,
//     });

//     expect(() => {
//       hullseries.getLayout();
//     }).to.throw('noStimulusfile');
//   });

//   it('gets a layout', () => {
//     const visit = Factory.create('visit');
//     visit.datafileId = Factory.create('imotionsDatafile')._id;

//     const hullseries = new VisitHullSeries({
//       visit,
//       period: 5000,
//     });

//     const layout = hullseries.getLayout();
//     expect(layout.height).to.equal(620);
//   });

//   it('inverts the y axis for an imotions datafile', () => {
//     const visit = Factory.create('visit');
//     visit.fileFormat = 'imotions';

//     const hullseries = new VisitHullSeries({
//       visit,
//       period: 5000,
//     });

//     expect(hullseries.getLayout().yaxis.range[1]).to.equal(0);
//     expect(hullseries.getLayout().yaxis.range[0]).to.be.gt(0);
//   });

//   it('inverts the y axis for an smi datafile', () => {
//     const visit = Factory.create('visit');
//     visit.fileFormat = 'smi';

//     const hullseries = new VisitHullSeries({
//       visit,
//       period: 5000,
//     });

//     expect(hullseries.getLayout().yaxis.range[1]).to.equal(0);
//     expect(hullseries.getLayout().yaxis.range[0]).to.be.gt(0);
//   });
// });
