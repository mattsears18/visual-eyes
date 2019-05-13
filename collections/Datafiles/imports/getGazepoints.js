export default function getGazepoints({
  saveStats = false,
}) {
  if (this.study().fixationsOnly) {
    return this.getFixations({ saveStats });
  }
  return this.getAllGazepoints({ saveStats });
}
