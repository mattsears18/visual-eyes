describe('helpers.distinctPoints()', () => {
  it('has one distinct point', () => {
    let points = [
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 100 },
    ];
    chai.expect(helpers.distinctPoints(points)).to.eql([
      { x: 100, y: 100 },
    ]);
  });

  it('has three distinct points', () => {
    let points = [
      { x: 100, y: 100 },//
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
    chai.expect(helpers.distinctPoints(points)).to.eql([
      { x: 100, y: 100 },
      { x: 100, y: 200 },
      { x: 200, y: 100 },
    ]);
  });
});
