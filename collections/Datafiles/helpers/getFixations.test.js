require('./../../factories.test');

describe('Datafiles.getFixations()', () => {
  it('filters out duplicate fixation indices', async () => {
    let datafile = Factory.create('smiDatafile');
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

    chai.expect(await datafile.getFixations(rows)).to.eql(expectedRows);
  });

  it('filters out non numeric and undefined indices', async () => {
    let datafile = Factory.create('smiDatafile');
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

    chai.expect(await datafile.getFixations(rows)).to.eql(expectedRows);
  });

  it('filters out duplicates and non numerics', async () => {
    let datafile = Factory.create('smiDatafile');
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

    chai.expect(await datafile.getFixations(rows)).to.eql(expectedRows);
  });
});
