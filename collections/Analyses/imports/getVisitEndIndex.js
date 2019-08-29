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

  let potentialEndIndex = startIndex;
  let nextIndex;

  if (this.type === 'iso15007') {
    for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
      // Check matching stimulus
      if (_fixations[i].stimulusId !== initialStimulusId) {
        nextIndex = i;
        break;
      }

      potentialEndIndex = i;
    }
  } else {
    for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
      // console.log(`'${i} of ${_fixations.length}`);
      // Check matching stimulus
      if (_fixations[i].stimulusId === initialStimulusId) {
        // Check MVGD
        if (
          _fixations[i].timestamp - _fixations[potentialEndIndex].timestampEnd
          > this.maxVisitGapDuration
        ) {
          // console.log('MVGD exceeded!');
          break;
        }

        potentialEndIndex = i;
      } else {
        // Stimulus doesn't match
        nextIndex = nextIndex || i;
        // console.log('nextIndex: ${nextIndex}');
      }
    }
  }

  // console.log(`potentialEndIndex: ${potentialEndIndex}`);

  if (potentialEndIndex === startIndex) {
    throw new Meteor.Error('noEndIndexFound', null, {
      nextIndex: nextIndex || startIndex + 1,
    });
  } else {
    // Check min visit duration
    if (
      _fixations[potentialEndIndex].timestampEnd
        - _fixations[startIndex].timestamp
      > this.minVisitDuration
    ) {
      return potentialEndIndex;
    }

    throw new Meteor.Error('minVisitDurationNotMet', null, {
      nextIndex: nextIndex || potentialEndIndex + 1,
    });
  }
}
