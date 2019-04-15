export default function timeStep() {
  if(this.gazepoints() && this.gazepoints().length > 1) {
    return (this.gazepoints()[this.gazepoints().length - 1].timestamp -
            this.gazepoints()[this.gazepoints().length - 2].timestamp);
  } else {
    return 0;
  }
}
