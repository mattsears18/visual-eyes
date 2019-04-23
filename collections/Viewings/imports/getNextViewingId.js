export default function getNextViewingId({
  number,
  participantId,
  stimulusId,
  previous = false,
}) {
  if(number) {
    let currentNumber = this.number;
    let nextNumber;

    if(previous) {
      nextNumber = Math.min(1, currentNumber - 1);
    } else {
      nextNumber = currentNumber + 1;
    }

    let nextViewing = Viewings.findOne({
      analysisId: this.analysisId,
      participantId: this.participantId,
      stimulusId: this.stimulusId,
      number: nextNumber,
    });

    if(nextViewing) {
      return nextViewing._id;
    } else {
      return this._id;
    }
  }
}
