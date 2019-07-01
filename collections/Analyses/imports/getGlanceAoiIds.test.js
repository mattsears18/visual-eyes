require('./../../factories.test');
const { expect } = require('chai');

describe('Analyses.getGazeAoiIds()', () => {
  it('does not have aoiIds', () => {
    const analysis = Factory.create('analysis');
    const points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    expect(analysis.getGazeAoiIds(points)).to.eql([]);
  });

  it('has aoiIds', () => {
    const analysis = Factory.create('analysis');
    const points = [
      { timestamp: 0 },
      { timestamp: 1000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 2000, aoiId: 'dafsdgfhgjfhgd' },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    expect(analysis.getGazeAoiIds(points)).to.eql(['dfgrhtjyghfgdf', 'dafsdgfhgjfhgd']);
  });

  it('has duplicate aoiIds', () => {
    const analysis = Factory.create('analysis');
    const points = [
      { timestamp: 0 },
      { timestamp: 1000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 2000, aoiId: 'sdfegrhtrytefs' },
      { timestamp: 3000, aoiId: 'dfgrhtjyghfgdf' },
      { timestamp: 4000, aoiId: 'sdfegrhtrytefs' },
    ];

    expect(analysis.getGazeAoiIds(points)).to.eql(['dfgrhtjyghfgdf', 'sdfegrhtrytefs']);
  });
});
