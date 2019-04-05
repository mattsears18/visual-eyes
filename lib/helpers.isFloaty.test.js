require('./helpers');
require('../collections/factories.test');

describe('lib/helpers.isFloaty()', () => {
  it('detects floaty values', () => {
    chai.expect(helpers.isFloaty(1))          .to.be.true;
    chai.expect(helpers.isFloaty('1'))        .to.be.true;
    chai.expect(helpers.isFloaty(0.4231))     .to.be.true;
    chai.expect(helpers.isFloaty(1))          .to.be.true;
    chai.expect(helpers.isFloaty(1-5.2))      .to.be.true;
    chai.expect(helpers.isFloaty('1-3'))      .to.be.true;
    chai.expect(helpers.isFloaty('.435464'))  .to.be.true;
    chai.expect(helpers.isFloaty('e'))        .to.be.false;
    chai.expect(helpers.isFloaty(''))         .to.be.false;
    chai.expect(helpers.isFloaty(undefined))  .to.be.false;
  });
});
