import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewing.getFixationProportion()', () => {
  it('has no gazepointCount', () => {
    const viewing = Factory.create('viewing');
    expect(viewing.getFixationProportion()).to.equal(0);
  });

  it('has a fixationCount of zero', () => {
    const viewing = Factory.create('viewing');
    viewing.gazepointCount = 10;
    viewing.fixationCount = 0;
    expect(viewing.getFixationProportion()).to.equal(0);
  });

  it('gets the proportion', () => {
    const viewing = Factory.create('viewing');
    viewing.gazepointCount = 10;
    viewing.fixationCount = 3;
    expect(viewing.getFixationProportion()).to.equal(0.3);
  });
});
