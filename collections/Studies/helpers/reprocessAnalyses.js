import Jobs from '../../../collections/Jobs/Jobs';

export default function reprocessAnalyses() {
  // console.log('study.reprocessAnalyses() studyId: ' + this._id);

  analyses = Analyses.find({ studyId: this._id });

  analyses.forEach(function(analysis) {
    analysis.makeViewingJobs();
  });

  // console.log('finished reprocessingAnalyses()');
}
