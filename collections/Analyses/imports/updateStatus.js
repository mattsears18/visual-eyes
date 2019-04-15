export default function updateStatus() {
  if(this.allViewingsProcessed() && this.status != 'processed') {
    Analyses.update({ _id: this._id }, { $set: { status: 'processed' }});
    Meteor.call('analyses.removeJobs', { analysisId: this._id });
  }
}
