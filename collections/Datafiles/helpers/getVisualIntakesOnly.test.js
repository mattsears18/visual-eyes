require('./../../factories.test');

describe('Datafiles.getVisualIntakesOnly()', () => {
  it('throws noDataReceived error', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [];
    chai.expect(() => { datafile.getVisualIntakesOnly() }).to.throw('noDataReceived');
    chai.expect(() => { datafile.getVisualIntakesOnly(rows) }).to.throw('noDataReceived');
  });

  it('detects visual intakes when the first row (and others) do not have a category', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '1' },
      { x: '2' },
      { category: '', x: '3' },
      { category: 'Saccade', x: '4' },
      { category: 'Visual Intake', x: '5' },
      { x: '6' },
    ];

    let expectedRows = [
      { category: 'Visual Intake', x: '5' },
    ];

    chai.expect(datafile.getVisualIntakesOnly(rows)).to.eql(expectedRows);
  });

  it('has no categories so it does not filter the points', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: 1, },
      { x: 2, },
      { x: 3, },
      { x: 4, },
      { x: 5, },
    ];
    chai.expect(datafile.getVisualIntakesOnly(rows)).to.eql(rows);
  });

  it('removes everything except visual intakes', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { category: 'Visual Intake', x: '1' },
      { category: '', x: '2' },
      { category: 'Visual Intake', x: '3' },
      { category: 'Saccade', x: '4' },
      { category: 'Visual Intake', x: '5' },
      { x: '6' },
    ];

    let expectedRows = [
      { category: 'Visual Intake', x: '1' },
      { category: 'Visual Intake', x: '3' },
      { category: 'Visual Intake', x: '5' },
    ];

    chai.expect(datafile.getVisualIntakesOnly(rows)).to.eql(expectedRows);
  });
});
