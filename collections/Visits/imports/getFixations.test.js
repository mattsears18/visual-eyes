import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Visit.getFixations()', () => {
  it('gets the fixations', () => {
    const study = Factory.create('study');
    const visit = Factory.create('visit', {
      studyId: study._id,
      timestamp: 3100,
      duration: 1900,
      timestampEnd: 5000,
    });

    const rows = [
      { timestamp: 3000, timestampEnd: 3200, duration: 200 }, // timestamp too early
      { timestamp: 3100, timestampEnd: 3300, duration: 200 }, // included
      { timestamp: 4000, timestampEnd: 4200, duration: 200 }, // included
      { timestamp: 4800, timestampEnd: 5000, duration: 200 }, // included
      { timestamp: 4801, timestampEnd: 5001, duration: 200 }, // timestampEnd too late (5001)
    ];

    rows.forEach((row) => {
      Factory.create('fixation', {
        ...row,
        type: 'Fixation',
        studyId: study._id,
      });
    });

    const fixations = visit.getFixations().fetch();

    expect(fixations.length).to.equal(3);
    expect(fixations[0].timestamp).to.equal(3100);
    expect(fixations[1].timestamp).to.equal(4000);
    expect(fixations[2].timestamp).to.equal(4800);
  });
});
