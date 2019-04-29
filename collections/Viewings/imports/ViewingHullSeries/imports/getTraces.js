export default function getTraces(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hulls = this.getHulls();
  let index = opt.index;

  let t0 = performance.now()

  if(initial) {
    let hull = hulls[0];
    return {
      name: hull.endTime(),
      data: [
        this.getPointsTrace({           initial: true, hull: hull }),
        this.getCentroidTrailTrace({    initial: true }),
        this.getLastPointTrailTrace({   initial: true, hull: hull }),
        this.getPolygonTrace({          initial: true, hull: hull }),
        this.getCentroidTrace({         initial: true, hull: hull }),
        this.getLastPointTrace({        initial: true, hull: hull }),
      ],
    };
  } else {
    if(typeof(index) != 'undefined') {
      let hull = hulls[index]
      let data = [
        this.getPointsTrace({           hull: hull }),
        this.getCentroidTrailTrace({    lastHull: hull }),
        this.getLastPointTrailTrace({   hull: hull }),
        this.getPolygonTrace({          hull: hull }),
        this.getCentroidTrace({         hull: hull }),
        this.getLastPointTrace({        hull: hull }),
      ]

      console.log('ViewingHullSeries.getTraces() duration: ' + (performance.now() - t0) + ' ms')
      return data
    }
  }
}
