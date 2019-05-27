export default function saveCSV(opt) {
  const viewings = Viewings.find({ analysisId: this._id });
  viewings.forEach(function(viewing) {
    viewing.saveCSV();
  });
}
