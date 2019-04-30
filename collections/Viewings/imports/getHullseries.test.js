require('./../../factories.test')
const expect = require('chai').expect

describe('Viewing.getHullseries()', () => {
  it('gets a hullseries', () => {
    let viewing = Factory.create('viewingWithGazepoints')
    let hullseries = viewing.getHullseries({
      period: 5000,
      timestep: 0,
      includeIncomplete: false,
      pointTrailLength: 10,
    })

    expect(hullseries.getHulls()).is.an('array')
  })
})
