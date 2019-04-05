require('./../../factories.test');

describe('Datafiles.getNumericPositiveCoordinatesOnly()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [];
    chai.expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(rows);
  });

  it('removes negative coordinate values', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-1', y: '500'},
      { x: '100', y: '-1'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes blanks', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '', y: '500'},
      { x: '100', y: ''},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes dashes', async () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-', y: '500'},
      { x: '100', y: '-'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(await datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });
});
