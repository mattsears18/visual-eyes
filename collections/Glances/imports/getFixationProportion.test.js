import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Glance.getFixationProportion()', () => {
  it('has no gazepointCount', () => {
    const glance = Factory.create('glance');
    expect(glance.getFixationProportion()).to.equal(0);
  });

  it('has a fixationCount of zero', () => {
    const glance = Factory.create('glance');
    glance.gazepointCount = 10;
    glance.fixationCount = 0;
    expect(glance.getFixationProportion()).to.equal(0);
  });

  it('gets the proportion', () => {
    const glance = Factory.create('glance');
    glance.gazepointCount = 10;
    glance.fixationCount = 3;
    expect(glance.getFixationProportion()).to.equal(0.3);
  });
});
