export default function saveCSV(opt) {
  const { individual } = opt || {};

  if (individual) {
    const viewings = Viewings.find({ analysisId: this._id });

    viewings.forEach(function(viewing) {
      viewing.saveCSV(opt);
    });
  } else {
    console.log('make a single file');
  }
}
