// probably don't actually need this test - include it in the makeEyeevents test and/or process test

// it('gets the video times for a real smi file', async () => {
//   const datafile = Factory.create('smiFullDatafile');
//   const rawData = await datafile.getRawData();

//   const hrstart = process.hrtime();
//   const mergedRows = datafile.mergeVideoStimulusRows(rawData);
//   const hrend = process.hrtime(hrstart);

//   console.info(
//     'Time to assign video times (hr): %ds %dms',
//     hrend[0],
//     hrend[1] / 1000000,
//   );

//   // the number of rows recorded on the video (stimulus includes '.avi')
//   expect(mergedRows.length).to.equal(104429);

//   const visualIntakeRowsWithStimulus = mergedRows.filter(
//     row => row['Category Binocular'] === 'Visual Intake' && row.Stimulus !== '-',
//   );

//   // 59 duplicate recordingTime rows + 46 duplicate index rows = 105 bad rows
//   // 32332 visual intake rows, minus 105 bad rows = 32227 visual intake rows
//   expect(visualIntakeRowsWithStimulus.length).to.equal(32227);
// }).timeout(60000);
