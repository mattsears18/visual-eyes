export default function getFixations() {
  let gazepoints = this.getGazepoints();
  let fixations = this.getFixationsOnly(gazepoints);
  console.log(helpers.formatNumber(fixations.length) + ' fixations');
  if(!this.fixationCount) {
    this.fixationCount = fixations.length;
    Datafiles.update({ _id: this._id }, { $set: { fixationCount: this.fixationCount }});
  }
  return fixations;
}
