import helpers from '../helpers';

const { expect } = require('chai');

describe('helpers.distinctPoints()', () => {
  it('has one distinct point', () => {
    const points = [
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
    ];
    expect(helpers.distinctPoints(points)).to.eql([{ x: 100, y: 100 }]);
  });

  it('has three distinct points', () => {
    const points = [
      { x: 100, y: 100 }, //
      { x: 100, y: 100 },
      { x: 100, y: 200 }, //
      { x: 100, y: 100 },
      { x: 200, y: 100 }, //
      { x: 200, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 200 },
      { x: 100, y: 200 },
    ];
    expect(helpers.distinctPoints(points)).to.eql([
      { x: 100, y: 100 },
      { x: 100, y: 200 },
      { x: 200, y: 100 },
    ]);
  });
});
