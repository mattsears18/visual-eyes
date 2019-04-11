require('./../../factories.test');

describe('Analyses.getViewingAoiIds()', () => {
  it('does not have aoiIds', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    chai.expect(analysis.getViewingAoiIds(points)).to.eql([]);
  });

  it('has aoiIds', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 2000, aoiId: 'dafsdgfhgjfhgd' },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    chai.expect(analysis.getViewingAoiIds(points)).to.eql(['dfgrhtjyghfgdf', 'dafsdgfhgjfhgd']);
  });

  it('has duplicate aoiIds', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 2000, aoiId: 'sdfegrhtrytefs' },
      { timestamp: 3000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 4000, aoiId: 'sdfegrhtrytefs' },
    ];

    chai.expect(analysis.getViewingAoiIds(points)).to.eql(['dfgrhtjyghfgdf', 'sdfegrhtrytefs']);
  });
});
