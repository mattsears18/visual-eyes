export default function getTraces(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hulls = this.getHulls();

  if(initial) {
    let hull = hulls[0];
    return {
      name: hull.endTime(),
      data: [
        this.getCentroidTrailTrace({    initial: true }),
        this.getPointsTrace({           initial: true, hull: hull }),
        this.getLastPointTrailTrace({   initial: true, hull: hull }),
        this.getPolygonTrace({          initial: true, hull: hull }),
        this.getCentroidTrace({         initial: true, hull: hull }),
        this.getLastPointTrace({        initial: true, hull: hull }),
      ],
    };
  } else {
    let frames = [];

    for(i=0; i < hulls.length; i++) {
      let hull = hulls[i]
      let frame = {
        name: hulls[i].endTime(),
        getData: () => {
          // let t0 = performance.now()
          let data = [
            this.getCentroidTrailTrace({ lastHull: hull }),
            this.getPointsTrace({ hull: hull }),
            this.getLastPointTrailTrace({ hull: hull }),
            this.getPolygonTrace({ hull: hull }),
            this.getCentroidTrace({ hull: hull }),
            this.getLastPointTrace({ hull: hull }),
          ]

          // console.log('getData() duration: ' + (performance.now() - t0) + ' ms')
          return data;
        },
      }

      frames.push(frame);
    }

    return frames;
  }
}
