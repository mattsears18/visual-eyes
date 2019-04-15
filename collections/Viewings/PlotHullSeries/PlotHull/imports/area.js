var areaPolygon = require('area-polygon');

export default function area({
  points = this.polygon({}),
  normalized = false
}) {
  if(points.length < 3) return 0;

  if(normalized) {
    if(!this.viewing().stimulus() || !this.viewing().stimulus().width || !this.viewing().stimulus().height) {
      throw new Error('invalidStimulusDimensions');
    }

    let stimulus = this.viewing().stimulus();

    points = points.map(point => {
      return { x: point[0] / stimulus.width, y: point[1] / stimulus.height }
    });
  }

  return areaPolygon(points);
}
