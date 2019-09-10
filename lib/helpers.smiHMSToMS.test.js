import helpers from './helpers';

const { expect } = require('chai');
require('../collections/factories.test');

describe('lib/helpers.smiHMSToMS()', () => {
  it('converts HMS to MS', () => {
    expect(helpers.smiHMSToMS('02:31:44:114')).to.equal(9104114);
    expect(helpers.smiHMSToMS('00:00:00:114')).to.equal(114);
    expect(helpers.smiHMSToMS('22:50:17:000')).to.equal(82217000);
  });
});
