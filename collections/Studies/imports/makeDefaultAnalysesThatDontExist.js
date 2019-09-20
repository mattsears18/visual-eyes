export default function makeDefaultAnalysesThatDontExist() {
  if (Meteor.isServer) {
    console.log('Study.makeDefaultAnalysesThatDontExist()');
  }

  // CUSTOM
  let minFixationDurations = [];

  let minVisitDurations = [
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

  // ISO 15007
  minFixationDurations = [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    110,
    120,
    130,
    140,
    150,
    160,
    170,
    180,
    190,
    200,
  ];

  minVisitDurations = [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    110,
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

  minFixationDurations.forEach((minFixationDuration) => {
    minVisitDurations.forEach((minVisitDuration) => {
      const matches = existingAnalyses.find(
        analysis => analysis.minFixationDuration === minFixationDuration
          && analysis.minVisitDuration === minVisitDuration,
      );

      if (typeof matches === 'undefined') {
        Analyses.insert({
          studyId: this._id,
          name: 'Analysis',
          minFixationDuration,
          minVisitDuration,
          type: 'iso15007',
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
