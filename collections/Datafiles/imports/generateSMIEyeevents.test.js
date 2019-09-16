import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.generateSMIEyeevents', () => {
  it("doesn't pass any data", () => {
    const datafile = Factory.create('smiDatafile');
    expect(() => {
      datafile.generateSMIEyeevents();
    }).to.throw('noData');
  });

  // it('generates eyeevents for a real smi file', async () => {
  //   const datafile = Factory.create('smiDatafile');
  //   datafile.fileFormat = 'smi';
  //   const rawData = await datafile.getRawData();
  //   const timestampedData = datafile.mergeVideoStimulusRows(rawData);
  //   const renamedRows = datafile.renameRows(timestampedData);

  //   const stimulus = Factory.create('stimulus', {
  //     name: 'ImageA',
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //   });
  //   const aoi = Factory.create('aoi', {
  //     name: 'Image A',
  //     studyId: datafile.studyId,
  //     datafileIds: [datafile._id],
  //     stimulusId: stimulus._id,
  //   });

  //   const assignedRows = datafile.getAssignedRows(renamedRows);
  //   const sortedRows = assignedRows.sort((a, b) => a.timestamp - b.timestamp);

  //   const events = datafile.generateSMIEyeevents(sortedRows);
  //   expect(events.length).to.equal(686); // (sum of the events below)

  //   const blinks = events.filter(event => event.type === 'Blink');
  //   const saccades = events.filter(event => event.type === 'Saccade');
  //   const fixations = events.filter(event => event.type === 'Fixation');

  //   expect(saccades.length).to.equal(316); // verified in excel
  //   expect(blinks.length).to.equal(24); // verified in excel
  //   expect(fixations.length).to.equal(346); // verified in excel

  //   expect(fixations[33].eventIndex).to.equal(34); // verified in excel
  //   expect(fixations[33].combinedEventIndex).to.equal(66); // verified in excel
  //   expect(fixations[33].timestamp).to.equal(11500); // verified in excel
  //   expect(fixations[33].xs).to.eql([
  //     310,
  //     310,
  //     310,
  //     310,
  //     310,
  //     310,
  //     310,
  //     310,
  //     310,
  //   ]); // verified in excel
  //   expect(fixations[33].ys).to.eql([
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //     -279,
  //   ]); // verified in excel
  //   expect(fixations[33].xMean).to.equal(310); // verified in excel
  //   expect(fixations[33].yMean).to.equal(-279); // verified in excel
  //   expect(fixations[33].duration).to.equal(133); // verified in excel
  // }).timeout(60000);

  // it('generates eyeevents for a real smi file with multiple stimuli', async () => {
  //   const datafile = Factory.create('smiMultiDatafile');
  //   datafile.fileFormat = 'smi';
  //   const rawData = await datafile.getRawData();
  //   const timestampedData = datafile.mergeVideoStimulusRows(rawData);
  //   const renamedRows = datafile.renameRows(timestampedData);
  //   const validCoordinateRows = datafile.getValidCoordinatesOnly(renamedRows);
  //   const assignedRows = datafile.getAssignedRows(validCoordinateRows);
  //   const sortedRows = assignedRows.sort((a, b) => a.timestamp - b.timestamp);
  //   const events = datafile.generateSMIEyeevents(sortedRows);
  //   // expect(events.length).to.equal(686); // (sum of the events below)

  //   const blinks = events.filter(event => event.type === 'Blink');
  //   const saccades = events.filter(event => event.type === 'Saccade');
  //   const fixations = events.filter(event => event.type === 'Fixation');

  //   console.log(`saccades:   ${saccades.length}`);
  //   console.log(`blinks:     ${blinks.length}`);
  //   console.log(`fixations:  ${fixations.length}`);

  //   expect(saccades.length).to.equal(4474); // verified in excel
  //   expect(blinks.length).to.equal(152); // verified in excel
  //   expect(fixations.length).to.equal(4638); // verified in excel

  //   expect(saccades[150].eventIndex).to.equal(178); // verified in excel
  //   expect(saccades[150].combinedEventIndex).to.equal(358); // verified in excel
  //   expect(saccades[150].timestamp).to.equal(75044); // verified in excel
  //   expect(saccades[150].xs).to.eql([539, 508, 489]); // verified in excel
  //   expect(saccades[150].ys).to.eql([466, 453, 443]); // verified in excel
  //   expect(saccades[150].xMean).to.eql(512); // verified in excel
  //   expect(saccades[150].yMean).to.eql(454); // verified in excel
  //   expect(saccades[150].duration).to.equal(33);
  //   // expect(saccades[150].fromAoiId).to.equal(aoi._id); // verified in excel
  //   // expect(saccades[150].toAoiId).to.equal(aoi._id); // verified in excel
  //   // TODO save the "fromAoiId" and "toAoiId"

  //   expect(blinks[1].eventIndex).to.equal(9); // verified in excel
  //   expect(blinks[1].combinedEventIndex).to.equal(17); // verified in excel
  //   expect(blinks[1].timestamp).to.equal(3070); // verified in excel
  //   expect(blinks[1].xs).to.eql([616, 629, 606, 589]); // verified in excel
  //   expect(blinks[1].ys).to.eql([466, 453, 443]); // verified in excel
  //   expect(blinks[1].xMean).to.eql(512); // verified in excel
  //   expect(blinks[1].yMean).to.eql(454); // verified in excel
  //   expect(blinks[1].duration).to.equal(33);

  //   // fixation #3 within Spool 4
  //   expect(fixations[100].eventIndex).to.equal(1889); // verified in excel
  //   expect(fixations[100].timestamp).to.equal(32875); // verified in excel
  //   expect(fixations[100].x).to.equal(389); // verified in excel
  //   expect(fixations[100].y).to.equal(538); // verified in excel
  //   expect(fixations[100].aoiId).to.equal(aoi._id); // verified in excel
  //   expect(fixations[100].timestampEnd).to.equal(33638);

  //   // expect(gazepoints[1000].fixationIndex).to.equal(1532); // verified in excel
  //   // expect(gazepoints[1000].timestamp).to.equal(21093); // verified in excel
  //   // expect(gazepoints[1000].x).to.equal(464); // verified in excel
  //   // expect(gazepoints[1000].y).to.equal(352); // verified in excel
  //   // expect(gazepoints[1000].aoiId).to.equal(aoi._id); // verified in excel
  // }).timeout(60000);
});
