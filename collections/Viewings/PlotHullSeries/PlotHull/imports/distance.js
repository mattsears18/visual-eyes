export default function distance(which) {
  if(typeof(which) != 'undefined') {
    if(this.gazepoints() && this.gazepoints().length > 1) {
      return (this.gazepoints()[this.gazepoints().length - 1][which] - this.gazepoints()[this.gazepoints().length - 2][which]);
    } else {
      return 0;
    }
  } else {
    return Math.sqrt((this.distance('x') * this.distance('x') + this.distance('y') * this.distance('y')));
  }
}
