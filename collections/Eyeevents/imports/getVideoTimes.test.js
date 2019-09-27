import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Eyeevents.getVideoTime()', () => {
  it('gets the timestamp in HMSMS', () => {
    const fixation = Factory.create('eyeevent', {
      timestamp: 13371337,
    });
    expect(fixation.getVideoTime()).to.equal('03:42:51.337');
  });
});
