export default function getTraces(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = this.getHull(opt)

  if(initial) {
    return {
      name: hull.endTime(),
      data: [
        this.getPointsTrace({         initial: true, hull: hull }),
        this.getCentroidTrailTrace({  initial: true }),
        this.getPointTrailTrace({     initial: true, hull: hull }),
        this.getPolygonTrace({        initial: true, hull: hull }),
        this.getCentroidTrace({       initial: true, hull: hull }),
        this.getLastPointTrace({      initial: true, hull: hull }),
      ],
    }
  } else {
    let data = [
      this.getPointsTrace({         hull: hull }),
      this.getCentroidTrailTrace({  hull: hull }),
      this.getPointTrailTrace({     hull: hull }),
      this.getPolygonTrace({        hull: hull }),
      this.getCentroidTrace({       hull: hull }),
      this.getLastPointTrace({      hull: hull }),
    ]

    return data
  }
}
