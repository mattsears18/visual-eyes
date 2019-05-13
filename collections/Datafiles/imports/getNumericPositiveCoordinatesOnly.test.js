require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getNumericPositiveCoordinatesOnly()', () => {
  it('returns empty array when passed empty array', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(rows);
  });

  it('removes negative coordinate values', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { x: '100', y: '500' },
      { x: '-1', y: '500' },
      { x: '100', y: '-1' },
      { x: '100', y: '-0.71' },
      { x: '100', y: '-1.3' },
    ];
    const expectedRows = [
      { x: '100', y: '500' },
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes blanks', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { x: '100', y: '500' },
      { x: '', y: '500' },
      { x: '100', y: '' },
    ];
    const expectedRows = [
      { x: '100', y: '500' },
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes dashes', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { x: '100', y: '500' },
      { x: '-', y: '500' },
      { x: '100', y: '-' },
    ];
    const expectedRows = [
      { x: '100', y: '500' },
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });
});
