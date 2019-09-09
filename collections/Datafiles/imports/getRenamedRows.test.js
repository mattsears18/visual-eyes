import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getRenamedRows()', () => {
  it('supplies no rawCsvData', () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.getRenamedRows();
    }).to.throw('noRawCsvData');
  });
  it('has no fileFormat', () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.getRenamedRows([1, 2, 3]);
    }).to.throw('noFileFormat');
  });
  it('has an unrecognized fileFormat', () => {
    const datafile = Factory.create('imotionsDatafile', { fileFormat: 'foo' });
    expect(() => {
      datafile.getRenamedRows([1, 2, 3]);
    }).to.throw('unrecognizedFileFormat');
  });
  it('renames smi headers', () => {
    const datafile = Factory.create('smiDatafile');
    datafile.fileFormat = 'smi';
    const rows = [
      {
        'RecordingTime [ms]': '2554850.7630',
        'Time of Day [h:m:s:ms]': '03:55:34:894',
        'Category Binocular': 'Saccade',
        'Index Binocular': '5',
        'Point of Regard Binocular X [px]': '592.7510',
        'Point of Regard Binocular Y [px]': '-216.5275',
        Stimulus: 'Spool 1',
        'AOI Name Binocular': '-',
      },
      {
        'RecordingTime [ms]': '2554867.2940',
        'Time of Day [h:m:s:ms]': '03:55:34:910',
        'Category Binocular': 'Saccade',
        'Index Binocular': '5',
        'Point of Regard Binocular X [px]': '589.2836',
        'Point of Regard Binocular Y [px]': '-214.0377',
        Stimulus: 'Spool 1',
        'AOI Name Binocular': '-',
      },
      {
        'RecordingTime [ms]': '2554883.9200',
        'Time of Day [h:m:s:ms]': '03:55:34:927',
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '6',
        'Point of Regard Binocular X [px]': '590.3164',
        'Point of Regard Binocular Y [px]': '-212.6354',
        Stimulus: 'Spool 1',
        'AOI Name Binocular': '-',
      },
    ];
    const expectedRows = [
      {
        timestamp: 2554851,
        timeOfDay: '03:55:34:894',
        category: 'Saccade',
        eventIndex: 5,
        x: 593,
        y: -217,
        stimulusName: 'Spool 1',
        aoiName: '-',
      },
      {
        timestamp: 2554867,
        timeOfDay: '03:55:34:910',
        category: 'Saccade',
        eventIndex: 5,
        x: 589,
        y: -214,
        stimulusName: 'Spool 1',
        aoiName: '-',
      },
      {
        timestamp: 2554884,
        timeOfDay: '03:55:34:927',
        category: 'Visual Intake',
        eventIndex: 6,
        x: 590,
        y: -213,
        stimulusName: 'Spool 1',
        aoiName: '-',
      },
    ];
    expect(datafile.getRenamedRows(rows)).to.eql(expectedRows);
  });
  it('renames imotions headers', () => {
    const datafile = Factory.create('imotionsDatafile');
    datafile.fileFormat = 'imotions';
    const rows = [
      {
        Timestamp: '597',
        FixationSeq: '1',
        GazeX: '506',
        GazeY: '94',
        StimulusName: 'Spool 3',
        GazeAOI: '',
        FixationX: '506',
        FixationY: '94',
        FixationDuration: '33',
      },
      {
        Timestamp: '614',
        FixationSeq: '1',
        GazeX: '509',
        GazeY: '93',
        StimulusName: 'Spool 3',
        GazeAOI: '',
        FixationX: '506',
        FixationY: '94',
        FixationDuration: '33',
      },
      {
        Timestamp: '630',
        FixationSeq: '1',
        GazeX: '508',
        GazeY: '95',
        StimulusName: 'Spool 3',
        GazeAOI: '',
        FixationX: '506',
        FixationY: '94',
        FixationDuration: '33',
      },
      {
        Timestamp: '645',
        GazeX: '345',
        GazeY: '876',
        StimulusName: 'Spool 3',
        GazeAOI: '',
      },
      {
        Timestamp: '660',
        GazeX: '324',
        GazeY: '87',
        StimulusName: 'Spool 3',
        GazeAOI: '',
      },
    ];
    const expectedRows = [
      {
        timestamp: 597,
        eventIndex: 1,
        x: 506,
        y: 94,
        stimulusName: 'Spool 3',
        aoiName: '',
        fixationX: 506,
        fixationY: 94,
        fixationDuration: 33,
      },
      {
        timestamp: 614,
        eventIndex: 1,
        x: 509,
        y: 93,
        stimulusName: 'Spool 3',
        aoiName: '',
        fixationX: 506,
        fixationY: 94,
        fixationDuration: 33,
      },
      {
        timestamp: 630,
        eventIndex: 1,
        x: 508,
        y: 95,
        stimulusName: 'Spool 3',
        aoiName: '',
        fixationX: 506,
        fixationY: 94,
        fixationDuration: 33,
      },
      {
        timestamp: 645,
        x: 345,
        y: 876,
        stimulusName: 'Spool 3',
        aoiName: '',
      },
      {
        timestamp: 660,
        x: 324,
        y: 87,
        stimulusName: 'Spool 3',
        aoiName: '',
      },
    ];
    expect(datafile.getRenamedRows(rows)).to.eql(expectedRows);
  });
});
