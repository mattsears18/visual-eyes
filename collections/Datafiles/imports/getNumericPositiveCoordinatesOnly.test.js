require('./../../factories.test')
const expect = require('chai').expect

describe('Datafiles.getNumericPositiveCoordinatesOnly()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(rows);
  });

  it('removes negative coordinate values', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-1', y: '500'},
      { x: '100', y: '-1'},
      { x: '100', y: '-0.71'},
      { x: '100', y: '-1.3'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes blanks', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '', y: '500'},
      { x: '100', y: ''},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes dashes', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-', y: '500'},
      { x: '100', y: '-'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });
});
