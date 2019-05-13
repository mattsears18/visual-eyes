export default function reprocessDatafiles() {
  this.datafiles().forEach((datafile) => {
    Datafiles.update({ _id: datafile._id }, {
      $set: {
        status: 'needsProcessing',
      },
      $unset: {
        headersRemoved: 1,
        fileFormat: 1,
        rawRowCount: 1,
        integerRowCount: 1,
        visualRowCount: 1,
        gazepointCount: 1,
        dupGazepointCount: 1,
        fixationCount: 1,
      },
    });
    datafile.makeProcessJob();
  });
}
