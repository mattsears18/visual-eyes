export default function getLastPointTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = this.getHull(opt)

  let name

  if(this.viewing.study().fixationsOnly) {
    name = 'Last Fixation'
  } else {
    name = 'Last Gaze Point'
  }

  if(initial) {
    return {
      name: name,
      x: [hull.points.slice(-1)[0].x],
      y: [hull.points.slice(-1)[0].y],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#FFFFFF',
        size: 15,
        line: {
          color: '#63a70a',
          width: 4
        },
      },
    }
  } else {
    return {
      x: [hull.points.slice(-1)[0].x],
      y: [hull.points.slice(-1)[0].y],
    }
  }
}
