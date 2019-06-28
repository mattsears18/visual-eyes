import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Glance.getSampledData()', () => {
  const testRows = [
    { x: 100, y: 400, elapsedTimeNormalized: '0.05' },
    { x: 200, y: 300, elapsedTimeNormalized: '0.1' },
    { x: 300, y: 200, elapsedTimeNormalized: '0.11' },
    { x: 400, y: 100, elapsedTimeNormalized: '0.2' },
    { x: 500, y: 700, elapsedTimeNormalized: '0.32' },
    { x: 600, y: 600, elapsedTimeNormalized: '0.42' },
    { x: 700, y: 500, elapsedTimeNormalized: '0.49' },
    { x: 800, y: 400, elapsedTimeNormalized: '0.50' },
    { x: 900, y: 300, elapsedTimeNormalized: '0.55' },
    { x: 100, y: 200, elapsedTimeNormalized: '0.59' },
    { x: 200, y: 100, elapsedTimeNormalized: '0.91' },
    { x: 300, y: 400, elapsedTimeNormalized: '0.93' },
    { x: 400, y: 300, elapsedTimeNormalized: '0.95' },
    { x: 500, y: 200, elapsedTimeNormalized: '0.99' },
    { x: 600, y: 100, elapsedTimeNormalized: '1' },
  ];
  it('has no step', () => {
    const glance = Factory.create('glance');
    expect(() => {
      glance.getSampledData([]);
    }).to.throw('noStep');
  });

  it('has an invalid step', () => {
    const glance = Factory.create('glance');
    expect(() => {
      glance.getSampledData([], 1337);
    }).to.throw('invalidStep');

    expect(() => {
      glance.getSampledData([], -2);
    }).to.throw('invalidStep');
  });

  it('has a step of zero', () => {
    const glance = Factory.create('glance');
    const rows = [];
    expect(glance.getSampledData(rows, 0)).to.eql(rows);
  });

  it('samples the data at 20%', () => {
    const glance = Factory.create('glance');

    const expected = [
      { x: 100, y: 400, elapsedTimeNormalized: '0.05' }, // 0
      { x: 400, y: 100, elapsedTimeNormalized: '0.2' }, //  0.2
      { x: 600, y: 600, elapsedTimeNormalized: '0.42' }, // 0.4
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.6
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.8
      { x: 600, y: 100, elapsedTimeNormalized: '1' }, //    1
    ];

    expect(glance.getSampledData(testRows, 20)).to.eql(expected);
  });

  it('samples the data at 10%', () => {
    const glance = Factory.create('glance');

    const expected = [
      { x: 100, y: 400, elapsedTimeNormalized: '0.05' }, // 0
      { x: 200, y: 300, elapsedTimeNormalized: '0.1' }, //  0.1
      { x: 400, y: 100, elapsedTimeNormalized: '0.2' }, //  0.2
      { x: 500, y: 700, elapsedTimeNormalized: '0.32' }, // 0.3
      { x: 600, y: 600, elapsedTimeNormalized: '0.42' }, // 0.4
      { x: 800, y: 400, elapsedTimeNormalized: '0.50' }, // 0.5
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.6
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.7
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.8
      { x: 200, y: 100, elapsedTimeNormalized: '0.91' }, // 0.9
      { x: 600, y: 100, elapsedTimeNormalized: '1' }, //    1
    ];

    expect(glance.getSampledData(testRows, 10)).to.eql(expected);
  });

  it('can sample at any step value', () => {
    const glance = Factory.create('glance');
    expect(glance.getSampledData(testRows, 0.5).length).to.equal(201);
  });
});
