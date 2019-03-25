export default function getFrames(options) {
  let hulls = this.plotHulls().getHulls();

  let centroids = [];
  let frames = [];

  for(hi = 0; hi < hulls.length; hi++) {
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

    let centroidTrail;

    if(hi == 0) {
      centroidTrail = {
        // x: [hulls[hi].centroid().x, (hulls[hi].centroid().x + 0.01)], // can't draw a line from 1 point, so have to send 2 points
        // y: [hulls[hi].centroid().y, (hulls[hi].centroid().y + 0.01)], // can't draw a line from 1 point, so have to send 2 points
        x: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
        y: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
      };
    } else {
      centroidTrail = {
        x: centroids.slice(0, hi + 1).map((c) => { return c.x; }),
        y: centroids.slice(0, hi + 1).map((c) => { return c.y; }),
      };
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
        points,
        lastFixationTrail,
        centroid,
        polygon,
        lastFixation,
      ],
    });
  }
  return frames;
}
