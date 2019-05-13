export default function getTraces(opt) {
  opt = opt || {};
  const initial = opt.initial || false;
  const hull = this.getHull(opt);

  if (initial) {
    return {
      name: hull.endTime(),
      data: [
        this.getPointsTrace({ initial: true, hull }),
        this.getPointTrailTrace({ initial: true, hull }),
        this.getCentroidTrailTrace({ initial: true }),
        this.getPolygonTrace({ initial: true, hull }),
        this.getCentroidTrace({ initial: true, hull }),
        this.getLastPointTrace({ initial: true, hull }),
      ],
    };
  }
  const data = [
    this.getPointsTrace({ hull }),
    this.getPointTrailTrace({ hull }),
    this.getCentroidTrailTrace({ hull }),
    this.getPolygonTrace({ hull }),
    this.getCentroidTrace({ hull }),
    this.getLastPointTrace({ hull }),
  ];

  return data;
}
