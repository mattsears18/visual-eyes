export default function reprocessDatafiles() {
  this.datafiles().forEach((datafile) => {
    Datafiles.update({ _id: datafile._id }, { $set: { status: 'needsProcessing' }});
    datafile.makeProcessJob();
  });
}
