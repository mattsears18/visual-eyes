export default function updateStatus() {
  // console.log('===================================');
  // console.log('viewing.updateStatus()');
  // console.log(this.jobs().count());
  // console.log(this.jobsCompleted().count());
  if(this.allJobsCompleted()) {
    Viewings.update({ _id: this._id }, { $set: { status: 'processed' }});
  }
}
