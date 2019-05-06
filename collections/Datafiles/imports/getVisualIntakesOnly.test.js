require('./../../factories.test');
const expect = require('chai').expect;

describe('Datafiles.getVisualIntakesOnly()', () => {
  it('returns empty array when passed empty array', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [];
    expect(await datafile.getVisualIntakesOnly(rows)).to.eql(rows);
  });

  it('filters out all rows without a category', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '1' },
      { x: '2' },
      { category: 'Visual Intake', x: '3' },
      { category: 'Visual Intake', x: '4' },
      { category: 'Visual Intake', x: '5' },
      { x: '6' },
    ];

    let expectedRows = [
      { category: 'Visual Intake', x: '3' },
      { category: 'Visual Intake', x: '4' },
      { category: 'Visual Intake', x: '5' },
    ];

    expect(await datafile.getVisualIntakesOnly(rows)).to.eql(expectedRows);
  });

  it('filters out all categories except visual intakes', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { category: 'Visual Intake', x: '1' },
      { category: '', x: '2' },
      { category: 'Visual Intake', x: '3' },
      { category: 'Saccade', x: '4' },
      { category: 'Visual Intake', x: '5' },
    ];

    let expectedRows = [
      { category: 'Visual Intake', x: '1' },
      { category: 'Visual Intake', x: '3' },
      { category: 'Visual Intake', x: '5' },
    ];

    expect(await datafile.getVisualIntakesOnly(rows)).to.eql(expectedRows);
  });

  it('filters out all rows', async () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: 1, },
      { x: 2, },
      { x: 3, },
      { x: 4, },
      { x: 5, },
    ];

    let expectedRows = [];

    expect(await datafile.getVisualIntakesOnly(rows)).to.eql(expectedRows);
  });
});
