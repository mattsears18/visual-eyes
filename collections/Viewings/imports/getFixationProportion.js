export default function getFixationProportion() {
  if (this.gazepointCount > 0) {
    return this.fixationCount / this.gazepointCount;
  }
  return 0;
}
