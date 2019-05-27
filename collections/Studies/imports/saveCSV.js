export default function saveCSV(opt) {
  const { groupBy } = opt || {};

  if (groupBy === 'analysis') {
    const analyses = Analyses.find({ studyId: this._id });
    analyses.forEach(function(analysis) {
      analysis.saveCSV({
        groupBy: 'participant',
      });
    });
  }
}
