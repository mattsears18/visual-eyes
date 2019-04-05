export default function getGazepoints() {
  if(this.study().fixationsOnly) {
    return this.getFixations();
  } else {
    return this.getAllGazepoints();
  }
}
