export default function azimuth() {
  let azimuth;
  if(this.gazepoints() && this.gazepoints().length > 1) {
    let start = this.gazepoints()[this.gazepoints().length - 2];
    let end = this.gazepoints()[this.gazepoints().length - 1];

    if(start.x == end.x && start.y == end.y) {
      azimuth = 0;
    } else {
      azimuth = 90 - Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

      if(azimuth < 0) {
        azimuth = azimuth + 360;
      }
    }
  }

  return azimuth;
}
