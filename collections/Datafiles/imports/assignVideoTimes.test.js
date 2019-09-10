import { Factory } from 'meteor/dburles:factory';

const { expect } = require('chai');

const fakeRawData = [
  {
    'Video Time [h:m:s:ms]': '01:00:02:500', // #1
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '3000',
    Stimulus: 'wael-5-recording.avi',
  },
  {
    'Video Time [h:m:s:ms]': '00:01:02:500', // #2
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '2000',
    Stimulus: 'wael-5-recording.avi',
  },
  {
    'Video Time [h:m:s:ms]': '00:01:01:500', // #3
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '1000',
    Stimulus: 'wael-5-recording.avi',
  },
  {
    'Video Time [h:m:s:ms]': '00:01:01:430', // #4
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '1',
    'RecordingTime [ms]': '2000',
    Stimulus: 'wael-5-recording.avi',
  },
  {
    'Video Time [h:m:s:ms]': '00:01:01:340', // #5
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '1',
    'RecordingTime [ms]': '1000',
    Stimulus: 'wael-5-recording.avi',
  },
  {
    'Video Time [h:m:s:ms]': '-', // #6
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '1',
    'RecordingTime [ms]': '200',
    Stimulus: 'Spool 2',
  },
  {
    'Video Time [h:m:s:ms]': '-', // #7
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '1',
    'RecordingTime [ms]': '100',
    Stimulus: 'Spool 2',
  },
  {
    'Video Time [h:m:s:ms]': '-', // #8
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '300',
    Stimulus: 'Spool 2',
  },
  {
    'Video Time [h:m:s:ms]': '-', // #9
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '200',
    Stimulus: 'Spool 2',
  },
  {
    'Video Time [h:m:s:ms]': '-', // #10
    'Category Binocular': 'Visual Intake',
    'Index Binocular': '2',
    'RecordingTime [ms]': '100',
    Stimulus: 'Spool 2',
  },
];

describe('Datafiles.assignVideoTimes()', () => {
  it("doesn't provide the raw data", async () => {
    const datafile = Factory.create('imotionsDatafile');

    expect(() => {
      datafile.assignVideoTimes();
    }).to.throw('noRawData');
  });

  it('has no stimulus intakes', async () => {
    const datafile = Factory.create('smiDatafile');

    // Makes no changes to the intakes
    expect(datafile.assignVideoTimes(fakeRawData.slice(0, 5))).to.eql(
      fakeRawData.slice(0, 5),
    );
  });

  it('assigns the correct video times when all indices match', async () => {
    const datafile = Factory.create('smiDatafile');

    // Note: returned rows are NOT sorted (do that later if necessary)
    const expected = [
      {
        'Video Time [h:m:s:ms]': '01:00:02:500', // #1
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '3000',
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:02:500', // #2
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '2000',
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:500', // #3
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '1000',
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:430', // #4
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '1',
        'RecordingTime [ms]': '2000',
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:340', // #5
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '1',
        'RecordingTime [ms]': '1000',
        Stimulus: 'wael-5-recording.avi',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:430', // #6
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '1',
        'RecordingTime [ms]': '200',
        Stimulus: 'Spool 2',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:340', // #7
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '1',
        'RecordingTime [ms]': '100',
        Stimulus: 'Spool 2',
      },
      {
        'Video Time [h:m:s:ms]': '01:00:02:500', // #8
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '300',
        Stimulus: 'Spool 2',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:02:500', // #9
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '200',
        Stimulus: 'Spool 2',
      },
      {
        'Video Time [h:m:s:ms]': '00:01:01:500', // #10
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '2',
        'RecordingTime [ms]': '100',
        Stimulus: 'Spool 2',
      },
    ];

    expect(datafile.assignVideoTimes(fakeRawData)).to.eql(expected);
  });

  it('gets the video times for a real smi file', async () => {
    const datafile = Factory.create('smiFullDatafile');
    const rawData = await datafile.getRawData();

    const hrstart = process.hrtime();
    const dataWithVideoTimes = datafile.assignVideoTimes(rawData);
    const hrend = process.hrtime(hrstart);

    console.info(
      'Time to assign video times (hr): %ds %dms',
      hrend[0],
      hrend[1] / 1000000,
    );
  });
});
