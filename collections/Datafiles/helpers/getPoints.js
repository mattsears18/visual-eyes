export default function getPoints() {
  if(this.study().fixationsOnly) {
    return this.getFixations();
  } else {
    return this.getGazepoints();
  }
}
