import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Visit.getFixations()', () => {
  it('gets the fixations', () => {
    const participant = Factory.create('participant');
    const visit = Factory.create('visit', {
      participantId: participant._id,
      fixationIndices: [2, 3, 4],
    });

    const rows = [
      {
        timestamp: 3000,
        timestampEnd: 3200,
        duration: 200,
        combinedEventIndex: 1,
      }, // timestamp too early
      {
        timestamp: 3100,
        timestampEnd: 3300,
        duration: 200,
        combinedEventIndex: 2,
      }, // included
      {
        timestamp: 4000,
        timestampEnd: 4200,
        duration: 200,
        combinedEventIndex: 3,
      }, // included
      {
        timestamp: 4800,
        timestampEnd: 5000,
        duration: 200,
        combinedEventIndex: 4,
      }, // included
      {
        timestamp: 4801,
        timestampEnd: 5001,
        duration: 200,
        combinedEventIndex: 5,
      }, // timestampEnd too late (5001)
    ];

    rows.forEach((row) => {
      Factory.create('eyeevent', {
        ...row,
        type: 'Fixation',
        participantId: participant._id,
      });
    });

    const fixations = visit.getFixations().fetch();

    expect(fixations.length).to.equal(3);
    expect(fixations[0].timestamp).to.equal(3100);
    expect(fixations[1].timestamp).to.equal(4000);
    expect(fixations[2].timestamp).to.equal(4800);
  });
});
