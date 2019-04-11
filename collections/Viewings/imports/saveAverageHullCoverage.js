export default function saveAverageHullCoverage(params) {
  let avg = this.plotHullSeries(params).getAverageCoverage();
  console.log('average hull coverage: ' + avg);

  let fieldSave;

  if(params.slideStep == 'slide') {
    fieldSave = { averageSlideHullCoverage: avg };
  } else if(params.slideStep == 'step') {
    fieldSave = { averageStepHullCoverage: avg };
  }

  if(fieldSave) {
    Viewings.update({ _id: this._id }, { $set: fieldSave });
  }

  return avg;
}
