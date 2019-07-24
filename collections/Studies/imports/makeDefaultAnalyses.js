export default function makeDefaultAnalyses() {
  const maxGlanceGapDurationDurations = [120, 250, 500, 1000, 2000, 3000, 4000, 5000];
  const minGlanceDurations = [
    120,
    250,
    500,
    1000,
    2000,
    3000,
    4000,
    5000,
    10000,
    20000,
    30000,
  ];

  minGlanceDurations.forEach((minGlanceDuration) => {
    maxGlanceGapDurationDurations.forEach((maxGlanceGapDurationDuration) => {
      Analyses.insert({
        studyId: this._id,
        name: 'Analysis',
        maxGlanceGapDuration: maxGlanceGapDurationDuration,
        minGlanceDuration: minGlanceDuration,
        ignoreOutsideImage: true,
        participantIds: this.participants().map(participant => participant._id),
        stimulusIds: this.stimuli().map(stimulus => stimulus._id),
      });
    });
  });
}
