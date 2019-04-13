export default function saveAverageHullCoverage(params) {
  if(!this.stimulus().width || !this.stimulus().height) {
    throw new Error('invalidStimulusDimensions');
  }

  let avg = this.plotHullSeries(params).getAverageCoverage();
  let fieldSave;

  if(params.slideStep == 'slide') {
    fieldSave = { averageSlideHullCoverage: avg };
  } else if(params.slideStep == 'step') {
    fieldSave = { averageStepHullCoverage: avg };
  }

  if(fieldSave) { Viewings.update({ _id: this._id }, { $set: fieldSave }) }

  return avg;
}
