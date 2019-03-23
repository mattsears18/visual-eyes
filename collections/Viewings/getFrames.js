export default function getFrames(options) {
  let hulls = this.plotHulls().getHulls();

  let centroids = [];
  let frames = [];

  for(hi = 0; hi < 200; hi++) {
    centroids.push(hulls[hi].centroid());
    let points = {
      x: hulls[hi].points(0),
      y: hulls[hi].points(1),
      // text: hulls[hi].pointsTimeText(),
    };

    let polygon = {
      x: hulls[hi].polygon(0),
      y: hulls[hi].polygon(1),
    }

    let centroid = {
      x: [hulls[hi].centroid().x],
      y: [hulls[hi].centroid().y],
    }

    let centroidTrail = {
      x: centroids.slice(0, hi + 1).map((c) => { return c.x; }),
      y: centroids.slice(0, hi + 1).map((c) => { return c.y; }),
    }

    let lastFixation = {
      x: [hulls[hi].recordings().slice(-1)[0].x],
      y: [hulls[hi].recordings().slice(-1)[0].y],
    }

    let lastFixationTrail = {
      x: hulls[hi].fixationTrail(Session.get('fixationTrailLength'), 0),
      y: hulls[hi].fixationTrail(Session.get('fixationTrailLength'), 1),
    }

    frames.push({
      name: hulls[hi].endTime(),
      data: [
        centroidTrail,
        centroid,
        points,
        polygon,
        lastFixationTrail,
        lastFixation,
      ],
    });
  }
  return frames;
}
