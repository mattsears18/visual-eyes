import { Factory } from 'meteor/dburles:factory';
import helpers from '../../../lib/helpers';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.getGazepoints()', () => {
    it('gets all gazepoints', async () => {
      const datafile = Factory.create('imotionsDatafile');
      const rows = [
        {
          timestamp: '1',
          x: '-3',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // negative
        {
          timestamp: '2',
          x: '100',
          y: 'dsfdgry',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // non numeric
        {
          timestamp: '3',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // good
        {
          timestamp: '4',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '5',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '6',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Saccade',
        }, // non visual intake
        {
          timestamp: '7',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Event',
        }, // non visual intake
        {
          timestamp: '8',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Something Else',
        }, // non visual intake
        {
          timestamp: '9',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '10',
          x: '100',
          y: '100',
          category: 'Visual Intake',
        }, // no stimulus
        {
          timestamp: '11',
          x: '100',
          y: '100',
          stimulusName: 'someName1',
          category: 'Visual Intake',
        }, // good
        {
          timestamp: '12',
          x: '100',
          y: '100',
          stimulusName: 'someName1',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '13',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // good
        {
          timestamp: '14',
          x: '100',
          y: '100',
          stimulusName: 'someName',
        }, // no category
        {
          timestamp: '15',
          x: '100',
          y: '100',
          stimulusName: '',
          category: 'Visual Intake',
        }, // blank stimulus name
        {
          timestamp: '16',
          x: '100',
          y: '100',
          stimulusName: '.avi',
          category: 'Visual Intake',
        }, // video stimulus
        {
          timestamp: '17',
          x: '100',
          y: '100',
          stimulusName: 'smiGlasses',
          category: 'Visual Intake',
        }, // glasses stimulus
      ];

      const expectedRows = [
        {
          timestamp: '3',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // good
        {
          timestamp: '4',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '5',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '9',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '11',
          x: '100',
          y: '100',
          stimulusName: 'someName1',
          category: 'Visual Intake',
        }, // good
        {
          timestamp: '12',
          x: '100',
          y: '100',
          stimulusName: 'someName1',
          category: 'Visual Intake',
        }, // duplicate
        {
          timestamp: '13',
          x: '100',
          y: '100',
          stimulusName: 'someName',
          category: 'Visual Intake',
        }, // good
      ];

      expect(await datafile.getGazepoints({ data: rows })).to.eql(expectedRows);
    });

    describe('iMotions', () => {
      const expectedRawRowCount = 12271; // verified in MS Excel
      const expectedIntegerRowCount = 3218; // verified in MS Excel
      const expectedGazepointCount = 3218; // verified in MS Excel

      it(`gets ${helpers.formatNumber(
        expectedGazepointCount,
      )} real iMotions gazepoints`, async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getGazepoints();
        expect(points.length).to.equal(expectedGazepointCount);
      });

      it('sets the point stats on the datafile instance', async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getGazepoints();
        expect(datafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(datafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(datafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('saves the point stats to the database', async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getGazepoints();
        const dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(dbDatafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(dbDatafile.gazepointCount).to.equal(expectedGazepointCount);
      });
    });

    describe('SMI', () => {
      const expectedRawRowCount = 12742; // verified in MS Excel
      const expectedIntegerRowCount = 4326; // verified in MS Excel
      const expectedGazepointCount = 2948; // verified in MS Excel

      it(`gets ${helpers.formatNumber(
        expectedGazepointCount,
      )} real SMI gazepoints`, async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('smiDatafile', { studyId: study._id });

        const points = await datafile.getGazepoints();
        expect(points.length).to.equal(expectedGazepointCount);
      });

      it('sets the point stats on the datafile instance', async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('smiDatafile', { studyId: study._id });

        const points = await datafile.getGazepoints();
        expect(datafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(datafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(datafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('saves the point stats to the database', async () => {
        const study = Factory.create('study', { fixationsOnly: false });
        const datafile = Factory.create('smiDatafile', { studyId: study._id });

        const points = await datafile.getGazepoints();
        const dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(dbDatafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(dbDatafile.gazepointCount).to.equal(expectedGazepointCount);
      });
    });
  });
}
