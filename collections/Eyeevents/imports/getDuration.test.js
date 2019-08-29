import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Eeyeevents.getDuration()', () => {
  it('gets a duration', () => {
    const fixation = Factory.create('fixation', {
      timestamp: 1000,
      timestampEnd: 2337,
    });
    expect(fixation.getDuration()).to.equal(1337);
  });
});
