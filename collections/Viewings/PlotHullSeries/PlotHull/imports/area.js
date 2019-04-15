var areaPolygon = require('area-polygon');

export default function area({
  points = helpers.distinctPoints(this.polygon({})),
}) {
  if(points.length < 3) return 0;
  return areaPolygon(points);
}
