import { Factory } from 'meteor/dburles:factory';

const { expect } = require('chai');

describe('Datafiles.mergeVideoStimulusRows()', () => {
  it("doesn't provide the raw data", async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(() => {
      datafile.mergeVideoStimulusRows();
    }).to.throw('noRawData');
  });

  it('has no stimulus intakes', async () => {
    const datafile = Factory.create('smiDatafile');
    const fakeRawData = [
      {
        'Category Binocular': 'Visual Intake', // #1
        'Index Binocular': 3,
        'RecordingTime [ms]': 4333,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #2
        'Index Binocular': 2,
        'RecordingTime [ms]': 3300,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #3
        'Index Binocular': 2,
        'RecordingTime [ms]': 3200,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #4
        'Index Binocular': 2,
        'RecordingTime [ms]': 3100,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #5
        'Index Binocular': 1,
        'RecordingTime [ms]': 2000,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #6
        'Index Binocular': 1,
        'RecordingTime [ms]': 1000,
        Stimulus: 'wael-5-recording.avi',
      },
    ];

    // Makes no changes to the intakes
    expect(datafile.mergeVideoStimulusRows(fakeRawData)).to.eql([
      {
        'Category Binocular': 'Visual Intake', // #6
        'Index Binocular': 1,
        'RecordingTime [ms]': 0,
        Stimulus: '-',
      },
      {
        'Category Binocular': 'Visual Intake', // #5
        'Index Binocular': 1,
        'RecordingTime [ms]': 1000,
        Stimulus: '-',
      },
      {
        'Category Binocular': 'Visual Intake', // #4
        'Index Binocular': 2,
        'RecordingTime [ms]': 2100,
        Stimulus: '-',
      },
      {
        'Category Binocular': 'Visual Intake', // #3
        'Index Binocular': 2,
        'RecordingTime [ms]': 2200,
        Stimulus: '-',
      },
      {
        'Category Binocular': 'Visual Intake', // #2
        'Index Binocular': 2,
        'RecordingTime [ms]': 2300,
        Stimulus: '-',
      },
      {
        'Category Binocular': 'Visual Intake', // #1
        'Index Binocular': 3,
        'RecordingTime [ms]': 3333,
        Stimulus: '-',
      },
    ]);
  });

  it('assigns the correct video times when all indices match', async () => {
    const datafile = Factory.create('smiDatafile');
    const fakeRawData = [
      {
        'Category Binocular': 'Visual Intake', // #1
        'Index Binocular': 3,
        'RecordingTime [ms]': 4333,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #2
        'Index Binocular': 2,
        'RecordingTime [ms]': 3300,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #3
        'Index Binocular': 2,
        'RecordingTime [ms]': 3200,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #4
        'Index Binocular': 2,
        'RecordingTime [ms]': 3100,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #5
        'Index Binocular': 1,
        'RecordingTime [ms]': 2000,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #6
        'Index Binocular': 1,
        'RecordingTime [ms]': 1000,
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Category Binocular': 'Visual Intake', // #7
        'Index Binocular': 1,
        'RecordingTime [ms]': 200,
        Stimulus: 'Spool 2',
      },
      {
        'Category Binocular': 'Visual Intake', // #8
        'Index Binocular': 1,
        'RecordingTime [ms]': 100,
        Stimulus: 'Spool 2',
      },
      {
        'Category Binocular': 'Visual Intake', // #9
        'Index Binocular': 2,
        'RecordingTime [ms]': 1333,
        Stimulus: 'Spool 7',
      },
      {
        'Category Binocular': 'Visual Intake', // #10
        'Index Binocular': 2,
        'RecordingTime [ms]': 1222,
        Stimulus: 'Spool 7',
      },
      {
        'Category Binocular': 'Visual Intake', // #11
        'Index Binocular': 2,
        'RecordingTime [ms]': 1111,
        Stimulus: 'Spool 7',
      },
    ];

    const expected = [
      {
        'Category Binocular': 'Visual Intake', // #6
        'Index Binocular': 1,
        'RecordingTime [ms]': 0,
        Stimulus: 'Spool 2',
      },
      {
        'Category Binocular': 'Visual Intake', // #5
        'Index Binocular': 1,
        'RecordingTime [ms]': 1000,
        Stimulus: 'Spool 2',
      },
      {
        'Category Binocular': 'Visual Intake', // #4
        'Index Binocular': 2,
        'RecordingTime [ms]': 2100,
        Stimulus: 'Spool 7',
      },
      {
        'Category Binocular': 'Visual Intake', // #3
        'Index Binocular': 2,
        'RecordingTime [ms]': 2200,
        Stimulus: 'Spool 7',
      },
      {
        'Category Binocular': 'Visual Intake', // #2
        'Index Binocular': 2,
        'RecordingTime [ms]': 2300,
        Stimulus: 'Spool 7',
      },
      {
        'Category Binocular': 'Visual Intake', // #1
        'Index Binocular': 3,
        'RecordingTime [ms]': 3333,
        Stimulus: '-',
      },
    ];

    expect(datafile.mergeVideoStimulusRows(fakeRawData)).to.eql(expected);
  });

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
});
