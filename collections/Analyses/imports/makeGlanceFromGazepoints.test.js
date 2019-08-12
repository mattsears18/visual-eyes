import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.makeGlanceFromGazepoints()', () => {
  it('has no fileFormat', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({});
    }).to.throw('noFileFormat');
  });

  it('has no participantId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
      });
    }).to.throw('noParticipantId');
  });

  it('has a nonexistent participant', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: 'abc',
      });
    }).to.throw('noParticipantFound');
  });

  it('has no stimulusId', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: Factory.create('participant')._id,
      });
    }).to.throw('noStimulusId');
  });

  it('has a nonexistent stimulus', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: Factory.create('participant')._id,
        stimulusId: 'abc',
      });
    }).to.throw('noStimulusFound');
  });

  it('has no gazepoints', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
      });
    }).to.throw('noGazepoints');
  });

  it('has a startIndex that is out of bounds', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
        gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
        startIndex: -7,
      });
    }).to.throw('startIndexOutOfBounds');
  });

  it('has an endIndex that is out of bounds', () => {
    const analysis = Factory.create('analysis');
    expect(() => {
      analysis.makeGlanceFromGazepoints({
        fileFormat: 'imotions',
        participantId: Factory.create('participant')._id,
        stimulusId: Factory.create('stimulus')._id,
        gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
        endIndex: 100,
      });
    }).to.throw('endIndexOutOfBounds');
  });

  it('has an invalid stimulus width', () => {
    const analysis = Factory.create('analysis');
    const glanceId = analysis.makeGlanceFromGazepoints({
      fileFormat: 'imotions',
      participantId: Factory.create('participant')._id,
      stimulusId: Factory.create('stimulus', { width: 0 })._id,
      gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
    });

    const glance = Glances.findOne({ _id: glanceId });
    expect(glance.status).to.equal('invalidStimulusDimensions');
  });

  it('has an invalid stimulus height', () => {
    const analysis = Factory.create('analysis');
    const glanceId = analysis.makeGlanceFromGazepoints({
      fileFormat: 'imotions',
      participantId: Factory.create('participant')._id,
      stimulusId: Factory.create('stimulus', { height: 0 })._id,
      gazepoints: [{ x: 0.5, y: 0.5, timestamp: 0 }],
    });

    const glance = Glances.findOne({ _id: glanceId });
    expect(glance.status).to.equal('invalidStimulusDimensions');
  });

  it('successfully makes a glance', async () => {
    const analysis = Factory.create('analysis');
    const participant = Factory.create('participant');
    const stimulus = Factory.create('stimulus');
    const points = [
      { x: 0.5, y: 0.5, timestamp: 0 },
      { x: 0.5, y: 0.5, timestamp: 1000 },
      {
        x: 0.5,
        y: 0.5,
        timestamp: 2000,
        fixationIndex: 1,
      },
      { x: 0.5, y: 0.5, timestamp: 3000 },
      { x: 0.5, y: 0.5, timestamp: 4000 },
      {
        x: 0.5,
        y: 0.5,
        timestamp: 5000,
        fixationIndex: 2,
      },
      { x: 0.5, y: 0.5, timestamp: 6000 },
      { x: 0.5, y: 0.5, timestamp: 7000 },
      { x: 0.5, y: 0.5, timestamp: 8000 },
      { x: 0.5, y: 0.5, timestamp: 9000 },
      { x: 0.5, y: 0.5, timestamp: 10000 },
      { x: 0.5, y: 0.5, timestamp: 11000 },
    ];

    const glanceId = analysis.makeGlanceFromGazepoints({
      fileFormat: 'imotions',
      participantId: participant._id,
      stimulusId: stimulus._id,
      gazepoints: points,
      startIndex: 2,
      endIndex: 6,
      number: 7,
    });

    const glance = Glances.findOne({ _id: glanceId });

    expect(glance.analysisId).to.equal(analysis._id);
    expect(glance.startTime).to.equal(2000);
    expect(glance.endTime).to.equal(6000);
    expect(glance.duration).to.equal(4000);
    expect(glance.number).to.equal(7);
    expect(glance.participantId).to.equal(participant._id);
    expect(glance.stimulusId).to.equal(stimulus._id);
    expect(glance.aoiIds.length).to.equal(0);
    expect(glance.status).to.equal('processed');

    expect(glance.gazepoints).to.eql([
      {
        x: 0.5,
        y: 0.5,
        timestamp: 2000,
        fixationIndex: 1,
      },
      { x: 0.5, y: 0.5, timestamp: 3000 },
      { x: 0.5, y: 0.5, timestamp: 4000 },
      {
        x: 0.5,
        y: 0.5,
        timestamp: 5000,
        fixationIndex: 2,
      },
      { x: 0.5, y: 0.5, timestamp: 6000 },
    ]);

    expect(glance.gazepointCount).to.equal(5);
    expect(glance.gazepointFrequency).to.equal(1.25);
    expect(glance.fixationCount).to.equal(2);
    expect(glance.fixationFrequency).to.equal(0.5);
  }).timeout(60000);
});
