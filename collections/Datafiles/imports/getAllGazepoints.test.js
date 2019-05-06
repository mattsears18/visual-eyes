require('./../../factories.test');
const expect = require('chai').expect;

if(Meteor.isServer) {
  describe('Datafiles.getAllGazepoints()', () => {
    it('gets all gazepoints', async () => {
      let datafile = Factory.create('imotionsDatafile');
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

      expect(await datafile.getAllGazepoints({ data: rows })).to.eql(expectedRows);
    });

    describe('iMotions', () => {
      let expectedRawRowCount =       12271;      // verified in MS Excel
      let expectedIntegerRowCount =   9115;       // verified in MS Excel
      let expectedVisualRowCount =    9115;       // verified in MS Excel
      let expectedDupGazepointCount = 3218;       // verified in MS Excel
      let expectedGazepointCount =    1223;       // verified in MS Excel

      it('gets ' + helpers.formatNumber(expectedGazepointCount) + ' real iMotions gazepoints', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        expect(points.length).to.equal(expectedGazepointCount);
      });

      it('sets the point stats on the datafile instance', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        expect(datafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(datafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(datafile.visualRowCount).to.equal(expectedVisualRowCount);
        expect(datafile.dupGazepointCount).to.equal(expectedDupGazepointCount);
        expect(datafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('saves the point stats to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({ saveStats: true });
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(dbDatafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(dbDatafile.visualRowCount).to.equal(expectedVisualRowCount);
        expect(dbDatafile.dupGazepointCount).to.equal(expectedDupGazepointCount);
        expect(dbDatafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('does NOT save the point stats to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('imotionsDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.be.an('undefined');
        expect(dbDatafile.integerRowCount).to.be.an('undefined');
        expect(dbDatafile.visualRowCount).to.be.an('undefined');
        expect(dbDatafile.dupGazepointCount).to.be.an('undefined');
        expect(dbDatafile.gazepointCount).to.be.an('undefined');
      });
    });

    describe('SMI', () => {
      let expectedRawRowCount =       12742;      // verified in MS Excel
      let expectedIntegerRowCount =   10289;      // verified in MS Excel
      let expectedVisualRowCount =    7513;       // verified in MS Excel
      let expectedDupGazepointCount = 2948;       // verified in MS Excel
      let expectedGazepointCount =    205;        // verified in MS Excel

      it('gets ' + helpers.formatNumber(expectedGazepointCount) + ' real SMI gazepoints', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('smiDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        expect(points.length).to.equal(expectedGazepointCount);
      });

      it('sets the point stats on the datafile instance', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('smiDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        expect(datafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(datafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(datafile.visualRowCount).to.equal(expectedVisualRowCount);
        expect(datafile.dupGazepointCount).to.equal(expectedDupGazepointCount);
        expect(datafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('saves the point stats to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('smiDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({ saveStats: true });
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.equal(expectedRawRowCount);
        expect(dbDatafile.integerRowCount).to.equal(expectedIntegerRowCount);
        expect(dbDatafile.visualRowCount).to.equal(expectedVisualRowCount);
        expect(dbDatafile.dupGazepointCount).to.equal(expectedDupGazepointCount);
        expect(dbDatafile.gazepointCount).to.equal(expectedGazepointCount);
      });

      it('does NOT save the point stats to the database', async () => {
        let study = Factory.create('study', { fixationsOnly: false });
        let datafile = Factory.create('smiDatafile', { studyId: study._id });

        let points = await datafile.getAllGazepoints({});
        let dbDatafile = Datafiles.findOne({ _id: datafile._id });

        expect(dbDatafile.rawRowCount).to.be.an('undefined');
        expect(dbDatafile.integerRowCount).to.be.an('undefined');
        expect(dbDatafile.visualRowCount).to.be.an('undefined');
        expect(dbDatafile.dupGazepointCount).to.be.an('undefined');
        expect(dbDatafile.gazepointCount).to.be.an('undefined');
      });
    });
  });
}
