export default function makeDefaultAnalysesThatDontExist() {
  if (Meteor.isServer) {
    console.log('Study.makeDefaultAnalysesThatDontExist()');
  }
  const minVisitDurations = [
    60,
    80,
    100,
    120,
    200,
    250,
    500,
    1000,
    // 2000,
    // 3000,
    // 4000,
    // 5000,
    // 10000,
    // 20000,
    // 30000,
  ];
  const maxVisitGapDurationDurations = [
    // 8.33333,
    // 16.66667, // no good in our experiment
    20,
    30,
    40,
    45,
    50,
    60,
    65,
    70,
    // 75,
    80,
    85,
    90,
    95,
    100,
    110,
    120,
    250,
    // 500,
    // 1000,
    // 2000,
    // 3000,
    // 4000,
    // 5000,
  ];

  const existingAnalyses = Analyses.find({ studyId: this._id }).fetch();

  minVisitDurations.forEach((minVisitDuration) => {
    maxVisitGapDurationDurations.forEach((maxVisitGapDuration) => {
      const matches = existingAnalyses.find(
        analysis => analysis.minVisitDuration === minVisitDuration
          && analysis.maxVisitGapDuration === maxVisitGapDuration,
      );

      if (typeof matches === 'undefined') {
        Analyses.insert({
          studyId: this._id,
          name: 'Analysis',
          minVisitDuration,
          maxVisitGapDuration,
          type: 'custom',
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
