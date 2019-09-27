export default function getGlanceSaccade() {
  if (!this.combinedEventIndexStart || !this.combinedEventIndexEnd) {
    // (event indices must be >= 1 so valid indices are always truthy)
    throw new Error('invalidCombinedEventIndex');
  }

  const leadingSaccade = Eyeevents.findOne({
    type: 'Saccade',
    participantId: this.participantId,
    combinedEventIndex: this.combinedEventIndexStart - 1,
  });

  if (leadingSaccade) return leadingSaccade;

  const trailingSaccade = Eyeevents.findOne({
    type: 'Saccade',
    participantId: this.participantId,
    combinedEventIndex: this.combinedEventIndexEnd + 1,
  });

  if (trailingSaccade) return trailingSaccade;

  return undefined;
}
