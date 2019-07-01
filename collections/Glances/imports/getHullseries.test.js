import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Glances.getHullseries()', () => {
  it('gets a hullseries', () => {
    const glance = Factory.create('glanceWithGazepoints');
    const hullseries = glance.getHullseries({
      period: 5000,
      timestep: 0,
      includeIncomplete: false,
      pointTrailLength: 10,
    });

    expect(hullseries.getHulls()).is.an('array');
  });
});
