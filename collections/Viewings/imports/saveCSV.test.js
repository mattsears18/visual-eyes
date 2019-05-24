import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Viewing.saveCSV()', () => {
  it('has no period', () => {
    const viewing = Factory.create('viewing');
    expect(() => {
      viewing.saveCSV();
    }).to.throw('noPeriod');
  });

  it('has no timestep', () => {
    const viewing = Factory.create('viewing');
    expect(() => {
      viewing.saveCSV({
        period: 5000,
      });
    }).to.throw('noTimestep');
  });
});
