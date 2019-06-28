require('./../../factories.test');
const { expect } = require('chai');

describe('Variablefiles.getHullseries()', () => {
  it('gets a hullseries', () => {
    const gaze = Factory.create('gazeWithGazepoints');
    const hullseries = gaze.getHullseries({
      period: 5000,
      timestep: 0,
      includeIncomplete: false,
      pointTrailLength: 10,
    });

    expect(hullseries.getHulls()).is.an('array');
  });
});
