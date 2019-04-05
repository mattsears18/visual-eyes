export default function getGazepoints({
  saveStats = false
}) {
  if(this.study().fixationsOnly) {
    return this.getFixations({ saveStats: saveStats });
  } else {
    return this.getAllGazepoints({ saveStats: saveStats });
  }
}
