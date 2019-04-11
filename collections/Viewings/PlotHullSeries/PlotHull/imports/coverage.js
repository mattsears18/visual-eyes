var area = require('area-polygon');

export default function coverage() {
  if(this.gazepoints().length > 2) {
    return area(this.gazepoints());
  } else {
    return 0;
  }
}
