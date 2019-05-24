import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewing.getCSV()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 },
    { x: 200, y: 300, timestamp: 1000 },
    { x: 300, y: 200, timestamp: 2000 },
    { x: 400, y: 100, timestamp: 3000 },
    { x: 500, y: 700, timestamp: 4000 },
    { x: 600, y: 600, timestamp: 5000 },
    { x: 700, y: 500, timestamp: 6000 },
    { x: 800, y: 400, timestamp: 7000 },
    { x: 900, y: 300, timestamp: 8000 },
    { x: 100, y: 200, timestamp: 9000 },
    { x: 200, y: 100, timestamp: 10000 },
    { x: 300, y: 400, timestamp: 11000 },
    { x: 400, y: 300, timestamp: 12000 },
    { x: 500, y: 200, timestamp: 13000 },
    { x: 600, y: 100, timestamp: 14000 },
  ];

  it('has no period', () => {
    const viewing = Factory.create('viewing');
    expect(() => {
      viewing.getCSV();
    }).to.throw('noPeriod');
  });

  it('has no timestep', () => {
    const viewing = Factory.create('viewing');
    expect(() => {
      viewing.getCSV({
        period: 5000,
      });
    }).to.throw('noTimestep');
  });

  it('gets csv content', () => {
    const viewing = Factory.create('viewingWithGazepoints');
    expect(viewing.getCSV({ period: 5000, timestep: 0 }).length).to.be.gt(0);
  });
});
