import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.getRawData()', () => {
    it('has 12,271 rows of raw data', async () => {
      const imotionsDatafile = Factory.create('imotionsDatafile');
      expect((await imotionsDatafile.getRawData()).length).to.equal(12271);
    }).timeout(10000);

    it('has 12,742 rows of raw data', async () => {
      const smiDatafile = Factory.create('smiDatafile');
      expect((await smiDatafile.getRawData()).length).to.equal(12742);
    }).timeout(10000);

    it('has 146,558 rows of raw data', async () => {
      const smiMultiDatafile = Factory.create('smiMultiDatafile');
      expect((await smiMultiDatafile.getRawData()).length).to.equal(146558);
    }).timeout(10000);

    it('only gets the basic columns for an imotions file', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rawData = await datafile.getRawData();

      expect(Object.keys(rawData[0])).to.eql([
        'Timestamp',
        'FixationSeq',
        'GazeX',
        'GazeY',
        'FixationX',
        'FixationY',
        'FixationDuration',
        'StimulusName',
        'GazeAOI',
      ]);
    });

    it('only gets the basic columns for an smi file', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawData = await datafile.getRawData();

      expect(Object.keys(rawData[0])).to.eql([
        'RecordingTime [ms]',
        'Video Time [h:m:s:ms]',
        'Time of Day [h:m:s:ms]',
        'Category Binocular',
        'Index Binocular',
        'Point of Regard Binocular X [px]',
        'Point of Regard Binocular Y [px]',
        'Stimulus',
        'AOI Name Binocular',
      ]);
    });

    it('gets the full set of columns for an smi file', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawData = await datafile.getRawData({ full: true });

      expect(Object.keys(rawData[0])).to.eql([
        'RecordingTime [ms]',
        'Video Time [h:m:s:ms]',
        'Time of Day [h:m:s:ms]',
        'Category Binocular',
        'Index Binocular',
        'Point of Regard Binocular X [px]',
        'Point of Regard Binocular Y [px]',
        'Stimulus',
        'AOI Name Binocular',
        'Pupil Size Right X [px]',
        'Pupil Size Right Y [px]',
        'Pupil Diameter Right [mm]',
        'Pupil Size Left X [px]',
        'Pupil Size Left Y [px]',
        'Pupil Diameter Left [mm]',
        'Gaze Vector Right X',
        'Gaze Vector Right Y',
        'Gaze Vector Right Z',
        'Gaze Vector Left X',
        'Gaze Vector Left Y',
        'Gaze Vector Left Z',
        'Eye Position Right X [mm]',
        'Eye Position Right Y [mm]',
        'Eye Position Right Z [mm]',
        'Eye Position Left X [mm]',
        'Eye Position Left Y [mm]',
        'Eye Position Left Z [mm]',
      ]);
    });

    it('infers Number types in an iMotions file', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rawData = await datafile.getRawData();
      expect(rawData[120].GazeX).to.eql(382);
    });

    it('infers Number types in an SMI file', async () => {
      const datafile = Factory.create('smiDatafile');
      const rawData = await datafile.getRawData();
      expect(rawData[120]['RecordingTime [ms]']).to.eql(2555249.311);
    });
  });
}
