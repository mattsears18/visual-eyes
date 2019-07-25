export default function makeDefaultAnalyses() {
  const maxGlanceGapDurationDurations = [
    60,
    80,
    100,
    120,
    250,
    // 500,
    // 1000,
    // 2000,
    // 3000,
    // 4000,
    // 5000,
  ];
  const minGlanceDurations = [
    60,
    80,
    100,
    120,
    250,
    // 500,
    // 1000,
    // 2000,
    // 3000,
    // 4000,
    // 5000,
    // 10000,
    // 20000,
    // 30000,
  ];

  const existingAnalyses = Analyses.find({ studyId: this._id }).fetch();

  minGlanceDurations.forEach((minGlanceDuration) => {
    maxGlanceGapDurationDurations.forEach((maxGlanceGapDuration) => {
      const matches = existingAnalyses.find(
        analysis => analysis.minGlanceDuration === minGlanceDuration
          && analysis.maxGlanceGapDuration === maxGlanceGapDuration,
      );

      if (typeof matches === 'undefined') {
        Analyses.insert({
          studyId: this._id,
          name: 'Analysis',
          maxGlanceGapDuration,
          minGlanceDuration,
          ignoreOutsideImage: true,
          participantIds: this.participants().map(
            participant => participant._id,
          ),
          stimulusIds: this.stimuli().map(stimulus => stimulus._id),
        });
      }
    });
  });
}
