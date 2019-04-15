require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.coordinatesToXY()', () => {
  it('converts the coordinates to XY', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });
    let plotHull = new PlotHull({ viewing: viewing });

    let points = [
      [ 100, 100 ],
      [ 200, 100 ],
      [ 200, 200 ],
      [ 100, 200 ],
    ];

    chai.expect(plotHull.coordinatesToXY(points)).to.eql([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ]);
  });
});
