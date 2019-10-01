import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Analyses.filterFixationsByDuration()', () => {
  const testFixations = [
    {
      type: 'Fixation',
      timestamp: 0,
      duration: 16,
    },
    {
      type: 'Fixation',
      timestamp: 1000,
      duration: 30,
    },
    {
      type: 'Fixation',
      timestamp: 2000,
      duration: 60,
    },
    {
      type: 'Fixation',
      timestamp: 3000,
      duration: 80,
    },
    {
      type: 'Fixation',
      timestamp: 4000,
      duration: 100,
    },
    {
      type: 'Fixation',
      timestamp: 5000,
      duration: 120,
    },
    {
      type: 'Fixation',
      timestamp: 6000,
      duration: 121,
    },
    {
      type: 'Fixation',
      timestamp: 7000,
      duration: 200,
    },
    {
      type: 'Fixation',
      timestamp: 8000,
      duration: 1000,
    },
  ];

  it('provides no fixations', () => {
    const analysis = Factory.create('analysis');
    expect(analysis.filterFixationsByDuration).to.throw('noFixations');
    expect(() => {
      analysis.filterFixationsByDuration([]);
    }).to.throw('noFixations');
  });

  it('has an undefined minimum fixation duration', () => {
    const analysis = Factory.create('analysis');

    delete analysis.minFixationDuration;
    expect(
      analysis.filterFixationsByDuration(
        testFixations,
        analysis.minFixationDuration,
      ),
    ).to.eql(testFixations);
  });

  it('has a null minimum fixation duration', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: null,
    });

    expect(
      analysis.filterFixationsByDuration(
        testFixations,
        analysis.minFixationDuration,
      ),
    ).to.eql(testFixations);
  });

  it('filters by duration', () => {
    const analysis = Factory.create('analysis', {
      minFixationDuration: 121,
    });

    expect(
      analysis.filterFixationsByDuration(
        testFixations,
        analysis.minFixationDuration,
      ),
    ).to.eql([
      {
        type: 'Fixation',
        timestamp: 6000,
        duration: 121,
      },
      {
        type: 'Fixation',
        timestamp: 7000,
        duration: 200,
      },
      {
        type: 'Fixation',
        timestamp: 8000,
        duration: 1000,
      },
    ]);
  });
});
