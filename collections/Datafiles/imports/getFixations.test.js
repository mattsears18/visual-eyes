require('./../../factories.test');
const expect = require('chai').expect;

describe('Datafiles.getFixations()', () => {
  it('filters out duplicate fixation indices', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },   // good
      { stimulusName: 'someName', timestamp: '2', fixationIndex: '1' },   // duplicate
      { stimulusName: 'someName', timestamp: '3', fixationIndex: '1' },   // duplicate
      { stimulusName: 'someName', timestamp: '4', fixationIndex: '2' },   // good
      { stimulusName: 'someName', timestamp: '5', fixationIndex: '2' },   // duplicate
      { stimulusName: 'someName', timestamp: '6', fixationIndex: '2' },   // duplicate
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },   // good
    ];

    let expectedRows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },   // good
      { stimulusName: 'someName', timestamp: '4', fixationIndex: '2' },   // good
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },   // good
    ];

    expect(await datafile.getFixations({ data: rows })).to.eql(expectedRows);
  });

  it('filters out non numeric and undefined indices', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },
      { stimulusName: 'someName', timestamp: '2', fixationIndex: '' },
      { stimulusName: 'someName', timestamp: '3', fixationIndex: '-' },
      { stimulusName: 'someName', timestamp: '4', },
      { stimulusName: 'someName', timestamp: '5', fixationIndex: 'dasfdgfr' },
      { stimulusName: 'someName', timestamp: '6', fixationIndex: 'one' },
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },
    ];

    let expectedRows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },
      { stimulusName: 'someName', timestamp: '7', fixationIndex: '3' },
    ];

    expect(await datafile.getFixations({ data: rows })).to.eql(expectedRows);
  });

  it('filters out duplicates and non numerics', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },       // good
      { stimulusName: 'someName', timestamp: '2', fixationIndex: '1' },       // duplicate
      { stimulusName: 'someName', timestamp: '3', fixationIndex: '' },        // non numeric
      { stimulusName: 'someName', timestamp: '4', fixationIndex: '2' },       // good
      { stimulusName: 'someName', timestamp: '5', fixationIndex: '2' },       // duplicate
      { stimulusName: 'someName', timestamp: '6', fixationIndex: 'dfsdg' },   // non numeric
      { stimulusName: 'someName', timestamp: '7' },                           // non numeric
      { stimulusName: 'someName', timestamp: '8', fixationIndex: '1' },       // duplicate
      { stimulusName: 'someName', timestamp: '9', fixationIndex: '7' },       // good
    ];

    let expectedRows = [
      { stimulusName: 'someName', timestamp: '1', fixationIndex: '1' },       // good
      { stimulusName: 'someName', timestamp: '4', fixationIndex: '2' },       // good
      { stimulusName: 'someName', timestamp: '9', fixationIndex: '7' },       // good
    ];

    expect(await datafile.getFixations({ data: rows })).to.eql(expectedRows);
  });


  if(Meteor.isServer) {
    describe('iMotions', () => {
      let expectedFixationCount =    155;       // verified in MS Excel

      it('gets ' + helpers.formatNumber(expectedFixationCount) + ' real iMotions fixations', async () => {
        let study = Factory.create('study', { fixationsOnly: true });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getFixations({});
        expect(points.length).to.equal(expectedFixationCount);
      });

      it('sets the fixation count on the datafile instance', async () => {
        let study = Factory.create('study', { fixationsOnly: true });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getFixations({});
        expect(datafile.fixationCount).to.equal(expectedFixationCount);
      });

      it('saves the fixaiton count to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: true });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getFixations({ saveStats: true });
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.fixationCount).to.equal(expectedFixationCount);
      });

      it('does NOT save the fixation count to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: true });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getFixations({});
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.fixationCount).to.be.an('undefined');
      });
    });

    describe('SMI', () => {
      let expectedFixationCount =    205;       // verified in MS Excel

      it('gets ' + helpers.formatNumber(expectedFixationCount) + ' real SMI fixations', async () => {
        let study = Factory.create('study', { fixationsOnly: true });
        let datafile = Factory.create('smiDatafile', { studyId: study._id });

        let points = await datafile.getFixations({});
        expect(points.length).to.equal(expectedFixationCount);
      });
    });
  }
});
