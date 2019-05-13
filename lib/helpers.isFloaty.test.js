const { expect } = require('chai');
require('./helpers');
require('../collections/factories.test');

describe('lib/helpers.isFloaty()', () => {
  it('detects floaty values', () => {
    expect(helpers.isFloaty(1)).to.be.true;
    expect(helpers.isFloaty('1')).to.be.true;
    expect(helpers.isFloaty(0.4231)).to.be.true;
    expect(helpers.isFloaty(-0.4231)).to.be.true;
    expect(helpers.isFloaty(-2.4231)).to.be.true;
    expect(helpers.isFloaty(1)).to.be.true;
    expect(helpers.isFloaty(1 - 5.2)).to.be.true;
    expect(helpers.isFloaty('1-3')).to.be.true;
    expect(helpers.isFloaty('.435464')).to.be.true;
    expect(helpers.isFloaty('e')).to.be.false;
    expect(helpers.isFloaty('')).to.be.false;
    expect(helpers.isFloaty(undefined)).to.be.false;
  });
});
