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

  const initialAoiId = _fixations[startIndex].aoiId;

  if (initialAoiId == null) {
    throw new Error('noAoiId');
  }

  const initialAoi = Aois.findOne({ _id: initialAoiId });

  if (!initialAoi) {
    throw new Error('noAoiFound');
  }

  let potentialEndIndex = startIndex;
  let nextIndex;

  if (this.type === 'iso15007') {
    for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
      // Check matching aoi
      if (_fixations[i].aoiId !== initialAoiId) {
        nextIndex = i;
        break;
      }

      potentialEndIndex = i;
    }
  } else {
    for (let i = parseInt(startIndex, 10) + 1; i < _fixations.length; i += 1) {
      // console.log(`'${i} of ${_fixations.length}`);
      // Check matching aoi
      if (_fixations[i].aoiId === initialAoiId) {
        // Check MVGD
        if (_fixations[i].duration > this.maxVisitGapDuration) {
          // console.log('MVGD exceeded!');
          break;
        }

        potentialEndIndex = i;
      } else {
        // Aoi doesn't match
        nextIndex = nextIndex || i;
        // console.log('nextIndex: ${nextIndex}');
      }
    }
  }

  // console.log(`potentialEndIndex: ${potentialEndIndex}`);

  if (potentialEndIndex === startIndex) {
    throw new Meteor.Error('endIndexNotFound', null, {
      nextIndex: nextIndex || startIndex + 1,
    });
  } else {
    // Check min visit duration
    if (
      _fixations[potentialEndIndex].timestamp
        + _fixations[potentialEndIndex].duration
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
