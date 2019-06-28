export default function updateStatus() {
  if (this.allGazesProcessed() && this.status != 'processed') {
    Analyses.update({ _id: this._id }, { $set: { status: 'processed' } });
    Meteor.call('analyses.removeJobs', { analysisId: this._id });
  }

  let gazeCount = this.gazes().count();
  Analyses.update({ _id: this._id }, { $set: { gazeCount: gazeCount } });
}
