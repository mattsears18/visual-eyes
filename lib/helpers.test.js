require('./helpers');
require('../collections/factories.test');

describe('lib/helpers', () => {
  describe('.keyInArray()', () => {
    it('does not have the key', () => {
      let key = 'someKey';
      let data = [
        { a: 1, },
        { a: 2, },
        { a: 3, },
        { a: 4, },
        { a: 5, },
      ];

      chai.expect(helpers.keyInArray(key, data)).to.be.false;
    });

    it('has the key', () => {
      let key = 'someKey';
      let data = [
        { a: 1, },
        { a: 2, },
        { a: 3, someKey: 'some value' },
        { a: 4, },
        { a: 5, },
      ];

      chai.expect(helpers.keyInArray(key, data)).to.be.true;
    });

    it('has the key even though it\'s undefined', () => {
      let key = 'someKey';
      let data = [
        { a: 1, },
        { a: 2, },
        { a: 3, someKey: undefined },
        { a: 4, },
        { a: 5, },
      ];

      chai.expect(helpers.keyInArray(key, data)).to.be.true;
    });

    it('has the key even though it\'s blank', () => {
      let key = 'someKey';
      let data = [
        { a: 1, },
        { a: 2, },
        { a: 3, someKey: '' },
        { a: 4, },
        { a: 5, },
      ];

      chai.expect(helpers.keyInArray(key, data)).to.be.true;
    });

    it('detects categories in a real SMI file', async () => {
      let datafile = Factory.create('smiDatafile');
      chai.expect(helpers.keyInArray('category', await datafile.getRenamedRows())).to.be.true;
    });

    it('does not detect categories in a real imotions file', async () => {
      let datafile = Factory.create('imotionsDatafile');
      chai.expect(helpers.keyInArray('category', await datafile.getRenamedRows())).to.be.false;
    });
  });
});
