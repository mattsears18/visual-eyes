import helpers from '../../../lib/helpers';

require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getFixations()', () => {
  it('filters out non numeric and undefined indices', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },
      { stimulusName: 'someName', timestamp: '2', fixationIndex: '' },
      { stimulusName: 'someName', timestamp: '3', fixationIndex: '-' },
      { stimulusName: 'someName', timestamp: '4' },
      { stimulusName: 'someName', timestamp: '5', fixationIndex: 'dasfdgfr' },
      { stimulusName: 'someName', timestamp: '6', fixationIndex: 'one' },
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },
    ];

    const expectedRows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },
    ];

    expect(await datafile.getFixations({ data: rows })).to.eql(expectedRows);
  });

  if (Meteor.isServer) {
    describe('iMotions', () => {
      const expectedFixationCount = 155; // verified in MS Excel

      it(`gets ${helpers.formatNumber(
        expectedFixationCount,
      )} real iMotions fixations`, async () => {
        const study = Factory.create('study', { fixationsOnly: true });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getFixations({});
        expect(points.length).to.equal(expectedFixationCount);
      });

      it('sets the fixation count on the datafile instance', async () => {
        const study = Factory.create('study', { fixationsOnly: true });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getFixations({});
        expect(datafile.fixationCount).to.equal(expectedFixationCount);
      });

      it('saves the fixaiton count to the database', async () => {
        const study = Factory.create('study', { fixationsOnly: true });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getFixations({ saveStats: true });
        const dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.fixationCount).to.equal(expectedFixationCount);
      });

      it('does NOT save the fixation count to the database', async () => {
        const study = Factory.create('study', { fixationsOnly: true });
        const datafile = Factory.create('imotionsDatafile', {
          studyId: study._id,
        });

        const points = await datafile.getFixations({});
        const dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.fixationCount).to.be.an('undefined');
      });
    });

    describe('SMI', () => {
      const expectedFixationCount = 205; // verified in MS Excel

      it(`gets ${helpers.formatNumber(
        expectedFixationCount,
      )} real SMI fixations`, async () => {
        const study = Factory.create('study', { fixationsOnly: true });
        const datafile = Factory.create('smiDatafile', { studyId: study._id });

        const points = await datafile.getFixations({});
        expect(points.length).to.equal(expectedFixationCount);
      });
    });
  }
});
