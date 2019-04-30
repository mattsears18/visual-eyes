export default function getCentroidTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = this.getHull(opt)

  if(initial) {
    return {
      name: 'Centroid',
      x: [hull.centroid().x],
      y: [hull.centroid().y],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: 'FFFFFF',
        size: 8,
        line: {
          color: '#dc3545',
          width: 3
        },
      },
    }
  } else {
    return {
      x: [hull.centroid().x],
      y: [hull.centroid().y],
    }
  }
}
