export default function makeDefaultAnalysesThatDontExist() {
  if (Meteor.isServer) {
    console.log('Study.makeDefaultAnalysesThatDontExist()');
  }

  const existingAnalyses = Analyses.find({ studyId: this._id }).fetch();

  const minFixationDurations = [
    // 0,
    1,
    // 10,
    // 20,
    // 30,
    // 40,
    50,
    60,
    // 70,
    // 90,
    100,
    // 110,
    120,
    // 130,
    // 140,
    // 150,
    // 160,
    // 170,
    // 180,
    // 190,
    // 200,
  ];

  const minVisitDurations = [
    0,
    // 10,
    // 20,
    // 30,
    // 40,
    // 50,
    // 60,
    // 70,
    // 80,
    // 90,
    // 100,
    // 110,
    // 120,
    // 200,
    // 250,
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

  const maxOffStimulusFixationsOptions = [0, 1, 2, 3, 4, 5];

  minFixationDurations.forEach(minFixationDuration => {
    minVisitDurations.forEach(minVisitDuration => {
      maxOffStimulusFixationsOptions.forEach(maxOffStimulusFixations => {
        const matches = existingAnalyses.find(
          analysis =>
            analysis.minFixationDuration === minFixationDuration &&
            analysis.minVisitDuration === minVisitDuration &&
            analysis.maxOffStimulusFixations === maxOffStimulusFixations,
        );

        if (typeof matches === 'undefined') {
          Analyses.insert({
            studyId: this._id,
            name: 'Analysis',
            minFixationDuration,
            minVisitDuration,
            maxOffStimulusFixations,
            participantIds: this.participants().map(
              participant => participant._id,
            ),
            stimulusIds: this.stimuli().map(stimulus => stimulus._id),
          });
        }
      });
    });
  });
}
