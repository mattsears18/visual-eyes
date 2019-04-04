// // import StubCollections from 'meteor/hwillson:stub-collections';
// import Datafiles from './Datafiles';
// // import Studies from './../Studies/Studies';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
// import { Factory } from 'meteor/dburles:factory';
// require('./helpers');
// require('../factories');
//
// let study;
//
// describe('Datafiles', () => {
//   beforeEach(() => {
//     resetDatabase();
//   });
//
//   // afterEach(() => {
//   //   StubCollections.restore();
//   // });
//
//   if(Meteor.isServer) {
//     describe('.detectFormat()', () => {
//       describe('iMotions file', () => {
//         let datafile = Factory.create('imotionsDatafile');
//
//         it('detects the imotions format', async () => {
//           chai.expect(await datafile.detectFormat()).to.equal('imotions');
//         });
//       });
//
//       describe('SMI file', () => {
//         let datafile = Factory.create('smiDatafile');
//
//         it('detects the smi format', async () => {
//           chai.expect(await datafile.detectFormat()).to.equal('smi');
//         });
//       });
//     });
//   }
// });
