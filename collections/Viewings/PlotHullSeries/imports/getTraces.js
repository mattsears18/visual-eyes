export default function getTraces({
  initial = false,
}) {
  if(initial) {
    let hull = this.getHulls()[0];

    return [
      this.getCentroidTrailTrace({      initial: true }),
      hull.getPointsTrace({             initial: true }),
      hull.getLastPointTrailTrace({     initial: true }),
      hull.getPolygonTrace({            initial: true }),
      hull.getCentroidTrace({           initial: true }),
      hull.getLastPointTrace({          initial: true }),
    ];
  } else {
    let hulls = this.getHulls();
    let frames = [];

    hulls.forEach((hull, hi) => {
      let frame = {
        name: hull.endTime(),
        data: [
          this.getCentroidTrailTrace({ endIndex: hi }),
          hull.getPointsTrace({}),
          hull.getLastPointTrailTrace({}),
          hull.getPolygonTrace({}),
          hull.getCentroidTrace({}),
          hull.getLastPointTrace({}),
        ],
      }

      frames.push(frame);
    });

    return frames;
  }
}
