const { expect } = require('chai');
require('./helpers');
require('../collections/factories.test');

describe('lib/helpers.keyInArray()', () => {
  it('does not have the key', () => {
    const key = 'someKey';
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }];

    expect(helpers.keyInArray(key, data)).to.be.false;
  });

  it('has the key', () => {
    const key = 'someKey';
    const data = [
      { a: 1 },
      { a: 2 },
      { a: 3, someKey: 'some value' },
      { a: 4 },
      { a: 5 },
    ];

    expect(helpers.keyInArray(key, data)).to.be.true;
  });

  it("has the key even though it's undefined", () => {
    const key = 'someKey';
    const data = [
      { a: 1 },
      { a: 2 },
      { a: 3, someKey: undefined },
      { a: 4 },
      { a: 5 },
    ];

    expect(helpers.keyInArray(key, data)).to.be.true;
  });

  it("has the key even though it's blank", () => {
    const key = 'someKey';
    const data = [
      { a: 1 },
      { a: 2 },
      { a: 3, someKey: '' },
      { a: 4 },
      { a: 5 },
    ];

    expect(helpers.keyInArray(key, data)).to.be.true;
  });

  if (Meteor.isServer) {
    it('detects categories in a real SMI file', async () => {
      const datafile = Factory.create('smiDatafile');
      datafile.fileFormat = 'smi';
      const rawCsvData = await datafile.getRawCSV();
      expect(
        helpers.keyInArray('category', datafile.renameRows(rawCsvData)),
      ).to.be.true;
    });

    it('does not detect categories in a real imotions file', async () => {
      const datafile = Factory.create('imotionsDatafile');
      datafile.fileFormat = 'imotions';
      const rawCsvData = await datafile.getRawCSV();
      expect(
        helpers.keyInArray(
          'category',
          await datafile.renameRows(rawCsvData),
        ),
      ).to.be.false;
    });
  }
});
