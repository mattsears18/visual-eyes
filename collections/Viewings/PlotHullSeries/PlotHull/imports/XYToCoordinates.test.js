require('../../../../factories.test');
import PlotHull from '../PlotHull';

describe('PlotHull.XYToCoordinates()', () => {
  it('convertsd the XY to coorindates', () => {
    let viewing = Factory.create('viewing', {
      gazepoints: [
        { x: 100, y: 100, timestamp: 0 },
      ],
    });
    let plotHull = new PlotHull({ viewing: viewing });

    let points = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ];

    chai.expect(plotHull.XYToCoordinates(points)).to.eql([
      [ 100, 100 ],
      [ 200, 100 ],
      [ 200, 200 ],
      [ 100, 200 ],
    ]);
  });
});
