require('./../../factories.test')

describe('Viewing.getHullseries()', () => {
  it('gets a hullseries', () => {
    let viewing = Factory.create('viewingWithGazepoints')
    let hullseries = viewing.getHullseries({
      period: 5000,
      timestep: 0,
      includeIncomplete: false,
      pointTrailLength: 10,
    })

    chai.expect(hullseries.getHulls()).is.an('array')
  })
})
