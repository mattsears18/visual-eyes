export default function getVisitEndIndex({ fixations, startIndex = 0 }) {
  const _fixations = [...fixations];

  if (startIndex > _fixations.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  const badFixations = _fixations.filter(
    fixation => typeof fixation.timestamp === 'undefined'
      || typeof fixation.duration === 'undefined',
  );

  if (badFixations.length) {
    throw new Error('missingTimestampOrDuration');
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
  // let nextIndex;

  for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
    if (this.type !== 'iso15007') {
      // check minimum visit gap duration
      const gap = _fixations[i].timestamp
        + _fixations[i].duration
        - (_fixations[potentialEndIndex].timestamp
          + _fixations[potentialEndIndex].duration);

      // console.log(`gap: ${gap}`);

      if (gap > this.maxVisitGapDuration) {
        // console.log('visit gap duration exceeded!');
        // nextIndex = i;
        break;
      }
    }

    if (
      _fixations[i].stimulusId === initialStimulusId
      && _fixations[i].aoiId === initialAoiId
    ) {
      potentialEndIndex = i;
    } else if (this.type === 'iso15007') {
      break;
    }
  }

  if (potentialEndIndex === startIndex) {
    throw new Error('endIndexNotFound');
  } else if (this.type !== 'iso15007') {
    // Check min visit duration
    if (
      _fixations[potentialEndIndex].timestamp
        + _fixations[potentialEndIndex].duration
        - _fixations[startIndex].timestamp
      < this.minVisitDuration
    ) {
      throw new Error('minVisitDurationNotMet');
    }
  }

  return potentialEndIndex;
}
