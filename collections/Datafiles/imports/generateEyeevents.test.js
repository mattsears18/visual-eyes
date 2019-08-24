import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.generateEyeevents', () => {
  // it('generates eyeevents', () => {
  //   const datafile = Factory.create('imotionsDatafile');
  //   const stimulus1 = Factory.create('stimulus', {
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi11 = Factory.create('aoi', {
  //     studyId: datafile.studyId,
  //     stimulusId: stimulus1._id,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi12 = Factory.create('aoi', {
  //     studyId: datafile.studyId,
  //     stimulusId: stimulus1._id,
  //     datafileIds: [datafile._id],
  //   });

  //   const stimulus2 = Factory.create('stimulus', {
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi21 = Factory.create('aoi', {
  //     studyId: datafile.studyId,
  //     stimulusId: stimulus2._id,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi22 = Factory.create('aoi', {
  //     studyId: datafile.studyId,
  //     stimulusId: stimulus2._id,
  //     datafileIds: [datafile._id],
  //   });

  //   const rows = [
  //     {
  //       category: 'Visual Intake',
  //       stimulusId: stimulus1._id,
  //       aoiId: aoi11._id,
  //     },
  //     {
  //       category: 'Visual Intake',
  //       stimulusId: stimulus1._id,
  //       aoiId: aoi11._id,
  //     },
  //   ];

  //   const {
  //     saccades,
  //     blinks,
  //     gazepoints,
  //     fixations,
  //   } = datafile.generateEyeevents(rows);

  //   // console.log('saccades');
  //   // console.log(saccades);

  //   // console.log('blinks');
  //   // console.log(blinks);

  //   // console.log('gazepoints');
  //   // console.log(gazepoints);

  //   // console.log('fixations');
  //   // console.log(fixations);

  //   expect(saccades.length).to.equal(0);
  //   expect(blinks.length).to.equal(0);
  //   expect(gazepoints.length).to.equal(2);
  //   expect(fixations.length).to.equal(0);
  // });

  it('generates eyeevents for a real smi file', async () => {
    const study = Factory.create('study');
    const datafile = Factory.create('smiMultiDatafile', {
      studyId: study._id,
    });

    // console.log(await datafile.generateEyeevents());

    // const {
    //   saccades,
    //   blinks,
    //   gazepoints,
    //   fixations,
    // } = datafile.generateEyeevents(rows);

    // console.log('saccades');
    // console.log(saccades);

    // console.log('blinks');
    // console.log(blinks);

    // console.log('gazepoints');
    // console.log(gazepoints);

    // console.log('fixations');
    // console.log(fixations);

    // expect(saccades.length).to.equal(0);
    // expect(blinks.length).to.equal(0);
    // expect(gazepoints.length).to.equal(2);
    // expect(fixations.length).to.equal(0);
  });
});
