import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Gaze.getFixationProportion()', () => {
  it('has no gazepointCount', () => {
    const gaze = Factory.create('gaze');
    expect(gaze.getFixationProportion()).to.equal(0);
  });

  it('has a fixationCount of zero', () => {
    const gaze = Factory.create('gaze');
    gaze.gazepointCount = 10;
    gaze.fixationCount = 0;
    expect(gaze.getFixationProportion()).to.equal(0);
  });

  it('gets the proportion', () => {
    const gaze = Factory.create('gaze');
    gaze.gazepointCount = 10;
    gaze.fixationCount = 3;
    expect(gaze.getFixationProportion()).to.equal(0.3);
  });
});
