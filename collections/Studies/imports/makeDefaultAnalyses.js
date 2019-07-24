export default function makeDefaultAnalyses() {
  const maxGlanceGapDurations = [120, 250, 500, 1000, 2000, 3000, 4000, 5000];
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
    maxGlanceGapDurations.forEach((maxGlanceGapDuration) => {
      Analyses.insert({
        studyId: this._id,
        name: 'Analysis',
        glanceGap: maxGlanceGapDuration,
        minGlanceTime: minGlanceDuration,
        ignoreOutsideImage: true,
        participantIds: this.participants().map(participant => participant._id),
        stimulusIds: this.stimuli().map(stimulus => stimulus._id),
      });
    });
  });
}
