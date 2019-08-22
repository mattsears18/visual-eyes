import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.recomputeTimestamps()', () => {
    it('recomputes the timestamps', () => {
      const datafile = Factory.create('imotionsDatafile');
      const rows = [
        { timestamp: 0, timeOfDay: '03:41:18:228' },
        { timestamp: 0, timeOfDay: '03:41:18:245' },
        { timestamp: 0, timeOfDay: '03:41:18:261' },
        { timestamp: 0, timeOfDay: '03:41:18:278' },
        { timestamp: 0, timeOfDay: '03:41:18:294' },
        { timestamp: 0, timeOfDay: '03:41:18:311' },
      ];

      const expectedRows = [
        { originalTimestamp: 0, timestamp: 0, timeOfDay: '03:41:18:228' },
        { originalTimestamp: 0, timestamp: 17, timeOfDay: '03:41:18:245' },
        { originalTimestamp: 0, timestamp: 33, timeOfDay: '03:41:18:261' },
        { originalTimestamp: 0, timestamp: 50, timeOfDay: '03:41:18:278' },
        { originalTimestamp: 0, timestamp: 66, timeOfDay: '03:41:18:294' },
        { originalTimestamp: 0, timestamp: 83, timeOfDay: '03:41:18:311' },
      ];

      expect(datafile.recomputeTimestamps(rows)).to.eql(expectedRows);
    });

    it('sorts by the timeOfDay', () => {
      const datafile = Factory.create('imotionsDatafile');
      const rows = [
        { timestamp: 243, timeOfDay: '03:41:18:278' },
        { timestamp: 3124354, timeOfDay: '03:41:18:311' },
        { timestamp: 867564, timeOfDay: '03:41:18:228' },
        { timestamp: 2435, timeOfDay: '03:41:18:245' },
        { timestamp: 3240, timeOfDay: '03:41:18:261' },
        { timestamp: 0, timeOfDay: '03:41:18:294' },
      ];

      const expectedRows = [
        { originalTimestamp: 867564, timestamp: 0, timeOfDay: '03:41:18:228' },
        { originalTimestamp: 2435, timestamp: 17, timeOfDay: '03:41:18:245' },
        { originalTimestamp: 3240, timestamp: 33, timeOfDay: '03:41:18:261' },
        { originalTimestamp: 243, timestamp: 50, timeOfDay: '03:41:18:278' },
        { originalTimestamp: 0, timestamp: 66, timeOfDay: '03:41:18:294' },
        {
          originalTimestamp: 3124354,
          timestamp: 83,
          timeOfDay: '03:41:18:311',
        },
      ];

      expect(datafile.recomputeTimestamps(rows)).to.eql(expectedRows);
    });

    it('works with minutes and hours', () => {
      const datafile = Factory.create('imotionsDatafile');

      const rows = [
        { timestamp: 0, timeOfDay: '01:00:00:337' },
        { timestamp: 0, timeOfDay: '01:00:00:338' },
        { timestamp: 0, timeOfDay: '01:00:01:338' },
        { timestamp: 0, timeOfDay: '01:01:01:338' },
        { timestamp: 0, timeOfDay: '02:01:01:338' },
        { timestamp: 0, timeOfDay: '02:01:01:339' },
      ];

      const expectedRows = [
        { originalTimestamp: 0, timestamp: 0, timeOfDay: '01:00:00:337' },
        { originalTimestamp: 0, timestamp: 1, timeOfDay: '01:00:00:338' },
        { originalTimestamp: 0, timestamp: 1001, timeOfDay: '01:00:01:338' },
        { originalTimestamp: 0, timestamp: 61001, timeOfDay: '01:01:01:338' },
        { originalTimestamp: 0, timestamp: 3661001, timeOfDay: '02:01:01:338' },
        { originalTimestamp: 0, timestamp: 3661002, timeOfDay: '02:01:01:339' },
      ];

      expect(datafile.recomputeTimestamps(rows)).to.eql(expectedRows);
    });

    it('recomputes timestamps on a real smi file with multiple stimuli', async () => {
      const datafile = Factory.create('smiMultiDatafile');
      const rows = datafile.getStimuliOnly(await datafile.getRenamedRows());

      const recomputed = datafile.recomputeTimestamps(rows);
      expect(recomputed[0].timestamp).to.equal(0);
      expect(recomputed[recomputed.length - 1].timestamp).to.equal(142783);
      // this is the actual duration verified in excel from "timeOfDay"
    });
  });
}
