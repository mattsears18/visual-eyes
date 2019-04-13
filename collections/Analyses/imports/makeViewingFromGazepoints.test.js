require('./../../factories.test');

describe('Analyses.makeViewingFromGazepoints()', () => {
  it('has no participantId', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({})
    }).to.throw('noParticipantId');
  });

  it('has a nonexistent participant', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({ participantId: 'abc' })
    }).to.throw('noParticipantFound');
  });

  it('has no stimulusId', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({
        participantId: Factory.create('participant')._id,
      })
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({
        participantId: Factory.create('participant')._id,
        stimulusId: 'abc',
      })
    }).to.throw('noStimulusFound');
  });

  it('has no gazepoints', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
      })
    }).to.throw('noGazepoints');
  });

  it('has a startIndex that is out of bounds', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
        gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
        startIndex: -7,
      })
    }).to.throw('startIndexOutOfBounds');
  });

  it('has an endIndex that is out of bounds', () => {
    let analysis = Factory.create('analysis');
    chai.expect(() => {
      analysis.makeViewingFromGazepoints({
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
        gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
        endIndex: 100,
      })
    }).to.throw('endIndexOutOfBounds');
  });

  it('has an invalid stimulus width', () => {
    let analysis = Factory.create('analysis');
    let viewingId = analysis.makeViewingFromGazepoints({
      participantId: Factory.create('participant')._id,
      stimulusId: Factory.create('stimulus', { width: 0 })._id,
      gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
    });

    let viewing = Viewings.findOne({ _id: viewingId });
    chai.expect(viewing.status).to.equal('invalidStimulusDimensions');
  });

  it('has an invalid stimulus height', () => {
    let analysis = Factory.create('analysis');
    let viewingId = analysis.makeViewingFromGazepoints({
      participantId: Factory.create('participant')._id,
      stimulusId: Factory.create('stimulus', { height: 0 })._id,
      gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
    });

    let viewing = Viewings.findOne({ _id: viewingId });
    chai.expect(viewing.status).to.equal('invalidStimulusDimensions');
  });

  it('successfully makes a viewing', async () => {
    let analysis = Factory.create('analysis', { period: 1337 });
    let participant = Factory.create('participant');
    let stimulus = Factory.create('stimulus');
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

    let viewingId = analysis.makeViewingFromGazepoints({
      participantId: participant._id,
      stimulusId: stimulus._id,
      gazepoints: points,
      startIndex: 2,
      endIndex: 6,
      number: 7,
    });

    let viewing = Viewings.findOne({ _id: viewingId });

    chai.expect(viewing.analysisId).to.equal(analysis._id);
    chai.expect(viewing.period).to.equal(1337);
    chai.expect(viewing.startTime).to.equal(2000);
    chai.expect(viewing.endTime).to.equal(6000);
    chai.expect(viewing.duration).to.equal(4000);
    chai.expect(viewing.number).to.equal(7);
    chai.expect(viewing.participantId).to.equal(participant._id);
    chai.expect(viewing.stimulusId).to.equal(stimulus._id);
    chai.expect(viewing.aoiIds.length).to.equal(0);
    chai.expect(viewing.status).to.equal('processing');

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
