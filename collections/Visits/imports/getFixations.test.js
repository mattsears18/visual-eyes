// import '../../factories.test';

// import { Factory } from 'meteor/dburles:factory';
// import { expect } from 'chai';

// describe.only('Visit.getFixations()', () => {
//   it('gets the fixations', () => {
//     const study = Factory.create('study');
//     const visit = Factory.create('visit', {
//       studyId: study._id,
//       timestamp: 3100,
//       duration: 1900,
//     });

//     const rows = [
//       { timestamp: 3000 },
//       { timestamp: 3100 },
//       { timestamp: 4000 },
//       { timestamp: 5000 },
//       { timestamp: 5001 },
//     ];

//     rows.forEach((row) => {
//       Factory.create('fixation', {
//         ...row,
//         type: 'Fixation',
//         studyId: study._id,
//       });
//     });

//     expect(visit.getFixations()).to.eql([]);
//   });
// });
