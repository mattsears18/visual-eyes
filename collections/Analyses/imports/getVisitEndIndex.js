export default function getVisitEndIndex({ fixations, startIndex = 0 }) {
  const _fixations = [...fixations];

  if (startIndex > _fixations.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const badFixations = _fixations.filter(
    fixation => typeof fixation.timestamp === 'undefined'
      || typeof fixation.timestampEnd === 'undefined',
  );

  if (badFixations.length) {
    throw new Error('missingTimestampOrTimestampEnd');
  }

  const initialStimulusId = _fixations[startIndex].stimulusId;
  if (initialStimulusId == null) {
    throw new Error('noStimulusId');
  }

  const initialStimulus = Stimuli.findOne({ _id: initialStimulusId });
  if (!initialStimulus) {
    throw new Error('noStimulusFound');
  }

  if (initialStimulus.name === '-') {
    // check if first gaze point is on a "blank" stimulus
    throw new Error('blankInitialStimulus');
  }

  const initialAoiId = _fixations[startIndex].aoiId;
  if (initialAoiId == null) {
    throw new Error('noAoiId');
  }

  const initialAoi = Aois.findOne({ _id: initialAoiId });
  if (!initialAoi) {
    throw new Error('noAoiFound');
  }

  let potentialEndIndex = startIndex;
  let offTargetCount = 0;

  for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
    if (_fixations[i].aoiId === initialAoiId) {
      offTargetCount = 0;
      potentialEndIndex = i;
    } else {
      offTargetCount += 1;
      if (offTargetCount > this.maxFixationGap) break;
    }
  }

  if (potentialEndIndex === startIndex) {
    throw new Error('endIndexNotFound');
  }

  // Check min visit duration
  if (
    _fixations[potentialEndIndex].timestampEnd
      - _fixations[startIndex].timestamp
    < this.minVisitDuration
  ) {
    throw new Error('minVisitDurationNotMet');
  }

  return potentialEndIndex;
}
