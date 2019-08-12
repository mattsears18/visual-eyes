export default function getType() {
  if (this.type === null) {
    Analyses.update({ _id: this._id }, { $set: { type: 'custom' } });
    return 'custom';
  }
  return this.type;
}
