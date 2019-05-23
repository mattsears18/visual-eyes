export default function saveCSVs() {
  analyses = Analyses.find({ studyId: this._id });
  analyses.forEach(function(analysis) {
    analysis.saveCSVParticipants();
  });
}
