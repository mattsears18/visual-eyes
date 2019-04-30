export default function getCentroidTrailTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false

  if(initial) {
    return {
      name: 'Centroid Trail',
      x: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
      y: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#dc3545',
        width: 2.5,
      },
    }
  } else {
    let hull = this.getHull(opt)
    
    let xs = this.getCentroids({ hull: hull, which: 'x' })
    let ys = this.getCentroids({ hull: hull, which: 'y' })

    if(xs.length == 1 || ys.length == 1) {
      xs = [-10, -11]
      ys = [-10, -11]
    }

    return { x: xs, y: ys }
  }
}
