import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Visit.getFixationProportion()', () => {
  it('has no gazepointCount', () => {
    const visit = Factory.create('visit');
    expect(visit.getFixationProportion()).to.equal(0);
  });

  it('has a fixationCount of zero', () => {
    const visit = Factory.create('visit');
    visit.gazepointCount = 10;
    visit.fixationCount = 0;
    expect(visit.getFixationProportion()).to.equal(0);
  });

  it('gets the proportion', () => {
    const visit = Factory.create('visit');
    visit.gazepointCount = 10;
    visit.fixationCount = 3;
    expect(visit.getFixationProportion()).to.equal(0.3);
  });
});
