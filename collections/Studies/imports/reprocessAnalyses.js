import Jobs from '../../Jobs/Jobs';

export default function reprocessAnalyses() {
  analyses = Analyses.find({ studyId: this._id });

  analyses.forEach(function(analysis) {
    analysis.makeGazeJobs();
  });
}
