// import { Factory } from 'meteor/dburles:factory';

// const { expect } = require('chai');
// const testRows = require('../../../testFiles/shortFile/smiVideoTimeMatchRandomTestRows.json');

// describe('Datafiles.getRowVideoTime()', () => {
//   it("doesn't provide a stimulus row", async () => {
//     const datafile = Factory.create('smiDatafile');

//     expect(() => {
//       datafile.getRowVideoTime();
//     }).to.throw('noStimulusRow');
//   });

//   it("it doesn't provide the video rows", () => {
//     const datafile = Factory.create('smiDatafile');

//     expect(() => {
//       datafile.getRowVideoTime({ stimulusRow: {} });
//     }).to.throw('noVideoRows');
//   });

//   it('gets video times for a real SMI file with multiple stimuli', async () => {
//     const datafile = Factory.create('smiFullDatafile');
//     const rawData = await datafile.getRawData({ full: true });

//     const videoIntakes = rawData.filter(
//       row => row.Stimulus.includes('.avi')
//         && row['Category Binocular'] === 'Visual Intake',
//     );

//     const videoTimes = [];

//     testRows.forEach((testRow) => {
//       videoTimes.push(
//         datafile.getRowVideoTime({
//           stimulusRow: testRow,
//           videoRows: videoIntakes,
//         }),
//       );
//     });

//     expect(videoTimes).to.eql([
//       '00:06:45:007',
//       '00:07:09:900',
//       '00:07:53:828',
//       '00:02:14:214',
//       '00:02:14:214',
//     ]);
//   }).timeout(20000);

//   it('finds no match in the video rows', async () => {
//     const datafile = Factory.create('smiFullDatafile');
//     const rawData = await datafile.getRawData({ full: true });

//     const videoIntakes = rawData.filter(
//       row => row.Stimulus.includes('.avi')
//         && row['Category Binocular'] === 'Visual Intake',
//     );

//     const modifiedTestRows = [...testRows];
//     modifiedTestRows[0]['Index Binocular'] = '1337';

//     expect(() => {
//       datafile.getRowVideoTime({
//         stimulusRow: modifiedTestRows[0],
//         videoRows: videoIntakes,
//       });
//     }).to.throw('noVideoMatch');
//   }).timeout(20000);
// });
