// const TimeHull = require('../../lib/TimeHull')
// var expect     = require('chai').expect
//
// describe('TimeHull.pointTrail()', () => {
//   it('gets a trail', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(timeHull.pointTrail(3)).to.eql([
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ])
//   })
//
//   it('gets the x coordinates of a trail', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 200, y: 100, timestamp: 2000 },
//       { x: 300, y: 100, timestamp: 3000 },
//       { x: 400, y: 100, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(timeHull.pointTrail(3, 'x')).to.eql([
//       200, 300, 400
//     ])
//   })
//
//   it('gets the y coordinates of a trail', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 200, y: 700, timestamp: 2000 },
//       { x: 300, y: 300, timestamp: 3000 },
//       { x: 400, y: 200, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(timeHull.pointTrail(3, 'y')).to.eql([
//       700, 300, 200
//     ])
//   })
//
//   it('requests a trail longer than the points', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(timeHull.pointTrail(20)).to.eql([
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ])
//   })
//
//   it('requests an invalid trail length', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(() => { timeHull.pointTrail(-2) }).to.throw('invalidTrailLength')
//   })
//
//   it('requests a zero length trail', () => {
//     let points = [
//       { x: 100, y: 100, timestamp: 0 },
//       { x: 100, y: 100, timestamp: 1000 },
//       { x: 100, y: 100, timestamp: 2000 },
//       { x: 100, y: 100, timestamp: 3000 },
//       { x: 100, y: 100, timestamp: 4000 },
//     ]
//
//     let timeHull = new TimeHull({ seriesPoints: points })
//     expect(timeHull.pointTrail(0)).to.eql([])
//   })
// })
