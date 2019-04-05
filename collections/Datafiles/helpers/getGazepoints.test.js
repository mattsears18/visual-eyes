require('./../../factories.test');

describe('Datafiles.getGazepoints()', () => {
  it('gets gazepoints', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [
      { timestamp: '1',   x: '-3', y: '100', stimulusName: 'someName', category: 'Visual Intake' },       // negative
      { timestamp: '2',   x: '100', y: 'dsfdgry', stimulusName: 'someName', category: 'Visual Intake' },  // non numeric
      { timestamp: '3',   x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // good
      { timestamp: '4',   x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // duplicate
      { timestamp: '5',   x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // duplicate
      { timestamp: '6',   x: '100', y: '100', stimulusName: 'someName', category: 'Saccade' },            // non visual intake
      { timestamp: '7',   x: '100', y: '100', stimulusName: 'someName', category: 'Event' },              // non visual intake
      { timestamp: '8',   x: '100', y: '100', stimulusName: 'someName', category: 'Something Else' },     // non visual intake
      { timestamp: '9',   x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // duplicate
      { timestamp: '10',  x: '100', y: '100', category: 'Visual Intake' },                                // no stimulus
      { timestamp: '11',  x: '100', y: '100', stimulusName: 'someName1', category: 'Visual Intake' },     // good
      { timestamp: '12',  x: '100', y: '100', stimulusName: 'someName1', category: 'Visual Intake' },     // duplicate
      { timestamp: '13',  x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // good
      { timestamp: '14',  x: '100', y: '100', stimulusName: 'someName' },                                 // no category
    ];

    let expectedRows = [
      { timestamp: '3',   x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // good
      { timestamp: '11',  x: '100', y: '100', stimulusName: 'someName1', category: 'Visual Intake' },     // good
      { timestamp: '13',  x: '100', y: '100', stimulusName: 'someName', category: 'Visual Intake' },      // good
    ];

    chai.expect(await datafile.getGazepoints(rows)).to.eql(expectedRows);
  });
});
