require('./../../factories.test');

describe('Analyses.makeViewingFromGazepoints()', () => {
  it('makes a viewing', async () => {
    let analysis = Factory.create('analysis', { period: 1337 });
    let points = [
      { x: 0.5, y: 0.5, timestamp: 0 },
      { x: 0.5, y: 0.5, timestamp: 1000 },
      { x: 0.5, y: 0.5, timestamp: 2000, fixationIndex: 1 },
      { x: 0.5, y: 0.5, timestamp: 3000 },
      { x: 0.5, y: 0.5, timestamp: 4000 },
      { x: 0.5, y: 0.5, timestamp: 5000, fixationIndex: 2 },
      { x: 0.5, y: 0.5, timestamp: 6000 },
      { x: 0.5, y: 0.5, timestamp: 7000 },
      { x: 0.5, y: 0.5, timestamp: 8000 },
      { x: 0.5, y: 0.5, timestamp: 9000 },
      { x: 0.5, y: 0.5, timestamp: 10000 },
      { x: 0.5, y: 0.5, timestamp: 11000 },
    ];

    let viewing = await analysis.makeViewingFromGazepoints({
      gazepoints: points,
      startIndex: 2,
      endIndex: 6,
      number: 7,
      participantId: 'abc',
      stimulusId: 'xyz',
    });

    chai.expect(viewing.analysisId).to.equal(analysis._id);
    chai.expect(viewing.period).to.equal(1337);
    chai.expect(viewing.startTime).to.equal(2000);
    chai.expect(viewing.endTime).to.equal(6000);
    chai.expect(viewing.duration).to.equal(4000);
    chai.expect(viewing.number).to.equal(7);
    chai.expect(viewing.participantId).to.equal('abc');
    chai.expect(viewing.stimulusId).to.equal('xyz');
    chai.expect(viewing.aoiIds.length).to.equal(0);

    chai.expect(viewing.gazepoints).to.eql([
      { x: 0.5, y: 0.5, timestamp: 2000, fixationIndex: 1 },
      { x: 0.5, y: 0.5, timestamp: 3000 },
      { x: 0.5, y: 0.5, timestamp: 4000 },
      { x: 0.5, y: 0.5, timestamp: 5000, fixationIndex: 2 },
      { x: 0.5, y: 0.5, timestamp: 6000 },
    ]);

    chai.expect(viewing.gazepointCount).to.equal(5);
    chai.expect(viewing.gazepointFrequency).to.equal(1.25);
    chai.expect(viewing.fixationCount).to.equal(2);
    chai.expect(viewing.fixationFrequency).to.equal(0.5);

  }).timeout(20000);
});
