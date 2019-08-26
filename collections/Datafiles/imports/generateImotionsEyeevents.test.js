// import { Factory } from 'meteor/dburles:factory';

// require('../../factories.test');
// const { expect } = require('chai');

// describe('Datafiles.generateSMIEyeevents', () => {
//   it("doesn't pass any data", () => {
//     const datafile = Factory.create('imotionsDatafile');
//     expect(() => {
//       datafile.generateSMIEyeevents();
//     }).to.throw('noAssignedRows');
//   });

//   it('generates eyeevents for a real imotions file', async () => {
//     const datafile = Factory.create('imotionsDatafile');
//     datafile.fileFormat = 'imotions';
//     const rawCSVData = await datafile.getRawCSV();
//     const assignedRows = datafile.getAssignedRows(rawCSVData);

//     const {
//       saccades,
//       blinks,
//       gazepoints,
//       fixations,
//     } = datafile.generateSMIEyeevents(assignedRows);

//     expect(saccades.length).to.equal(0); // imotions report saccades
//     expect(blinks.length).to.equal(0); // imotions doesn't report blinks
//     expect(gazepoints.length).to.equal(5290); // verified in excel
//     expect(fixations.length).to.equal(155); // verified in excel

//     expect(fixations[3].index).to.equal(4); // verified in excel
//     expect(fixations[3].timestamp).to.equal(10538); // verified in excel
//     expect(fixations[3].duration).to.equal(216); // verified in excel
//     expect(fixations[3].x).to.equal(202); // verified in excel
//     expect(fixations[3].y).to.equal(188); // verified in excel

//     expect(fixations[100].index).to.equal(101); // verified in excel
//     expect(fixations[100].timestamp).to.equal(62282); // verified in excel
//     expect(fixations[100].duration).to.equal(166); // verified in excel
//     expect(fixations[100].x).to.equal(162); // verified in excel
//     expect(fixations[100].y).to.equal(320); // verified in excel
//   });
// });
