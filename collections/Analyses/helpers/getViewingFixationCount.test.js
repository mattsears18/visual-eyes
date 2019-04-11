require('./../../factories.test');

describe('Analyses.getViewingFixationCount()', () => {
  it('dose not have fixations', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000 },
      { timestamp: 2000 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    chai.expect(analysis.getViewingFixationCount(points)).to.equal(0);
  });

  it('has duplicate fixation indices', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000, fixationIndex: 1 },
      { timestamp: 2000, fixationIndex: 1 },
      { timestamp: 3000 },
      { timestamp: 4000 },
    ];

    chai.expect(analysis.getViewingFixationCount(points)).to.equal(1);
  });

  it('has fixations', () => {
    let analysis = Factory.create('analysis');
    let points = [
      { timestamp: 0 },
      { timestamp: 1000, fixationIndex: 1 },
      { timestamp: 2000, fixationIndex: 2 },
      { timestamp: 3000, fixationIndex: 3 },
      { timestamp: 4000 },
    ];

    chai.expect(analysis.getViewingFixationCount(points)).to.equal(3);
  });
});
