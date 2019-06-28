export default function updateStatus() {
  if (this.allGlancesProcessed() && this.status != 'processed') {
    Analyses.update({ _id: this._id }, { $set: { status: 'processed' } });
    Meteor.call('analyses.removeJobs', { analysisId: this._id });
  }

  let glanceCount = this.glances().count();
  Analyses.update({ _id: this._id }, { $set: { glanceCount: glanceCount } });
}
