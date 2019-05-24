import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewing.getCSV()', () => {
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
