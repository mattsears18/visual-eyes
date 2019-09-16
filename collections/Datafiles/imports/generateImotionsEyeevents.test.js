import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.generateImotionsEyeevents', () => {
  it("doesn't pass any data", () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.generateImotionsEyeevents();
    }).to.throw('noAssignedRows');
  });

  // it('generates eyeevents for a real imotions file', async () => {
  //   const datafile = Factory.create('imotionsDatafile');
  //   datafile.fileFormat = 'imotions';
  //   const rawData = await datafile.getRawData();
  //   const renamedRows = datafile.renameRows(rawData);

  //   const stimulus = Factory.create('stimulus', {
  //     name: 'Mapping 1',
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi = Factory.create('aoi', {
  //     name: '-',
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //     stimulusId: stimulus._id,
  //   });

  //   const assignedRows = datafile.getAssignedRows(renamedRows);

  //   const {
  //     saccades,
  //     blinks,
  //     gazepoints,
  //     fixations,
  //   } = datafile.generateImotionsEyeevents(assignedRows);

  //   expect(saccades.length).to.equal(0); // imotions report saccades
  //   expect(blinks.length).to.equal(0); // imotions doesn't report blinks
  //   expect(gazepoints.length).to.equal(3218); // verified in excel
  //   expect(fixations.length).to.equal(155); // verified in excel

  //   expect(fixations[3].eventIndex).to.equal(4); // verified in excel
  //   expect(fixations[3].timestamp).to.equal(10538); // verified in excel
  //   expect(fixations[3].x).to.equal(202); // verified in excel
  //   expect(fixations[3].y).to.equal(188); // verified in excel
  //   expect(fixations[3].aoiId).to.equal(aoi._id); // verified in excel
  //   expect(fixations[3].timestampEnd).to.equal(10754);

  //   expect(fixations[100].eventIndex).to.equal(101); // verified in excel
  //   expect(fixations[100].timestamp).to.equal(62282); // verified in excel
  //   expect(fixations[100].x).to.equal(162); // verified in excel
  //   expect(fixations[100].y).to.equal(320); // verified in excel
  //   expect(fixations[100].aoiId).to.equal(aoi._id); // verified in excel
  //   expect(fixations[100].timestampEnd).to.equal(62448);
  // });
});
