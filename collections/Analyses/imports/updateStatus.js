export default function updateStatus() {
  if (this.allGazesProcessed() && this.status != 'processed') {
    Analyses.update({ _id: this._id }, { $set: { status: 'processed' } });
  }

  const gazeCount = this.gazes().count();
  Analyses.update({ _id: this._id }, { $set: { gazeCount } });
}
