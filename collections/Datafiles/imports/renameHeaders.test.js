require('./../../factories.test')
const expect = require('chai').expect

describe('Datafiles.renameHeaders()', () => {
  it('throws a noFileformat error', () => {
    let datafile = Factory.create('imotionsDatafile', { fileFormat: undefined });
    expect(() => { datafile.renameHeaders() }).to.throw('noFileFormat');
  });

  it('throws a noCSVData error', () => {
    let datafile = Factory.create('imotionsDatafile');
    expect(() => { datafile.renameHeaders() }).to.throw('noCSVData');
  });

  it('throws an unrecognizedFileFormat error', () => {
    let datafile = Factory.create('imotionsDatafile', { fileFormat: 'foo' });
    expect(() => { datafile.renameHeaders([1,2,3]) }).to.throw('unrecognizedFileFormat');
  });

  it('renames smi headers', () => {
    let datafile = Factory.create('smiDatafile');
    let rows = [
      {
        'RecordingTime [ms]': '2554850.7630',
        'Time of Day [h:m:s:ms]': '03:55:34:894',
        'Category Binocular': 'Saccade',
        'Index Binocular': '5',
        'Point of Regard Binocular X [px]': '592.7510',
        'Point of Regard Binocular Y [px]': '-216.5275',
        'Stimulus': 'wael-5-recording.avi',
        'AOI Name Binocular': '-',
      },
      {
        'RecordingTime [ms]': '2554867.2940',
        'Time of Day [h:m:s:ms]': '03:55:34:910',
        'Category Binocular': 'Saccade',
        'Index Binocular': '5',
        'Point of Regard Binocular X [px]': '589.2836',
        'Point of Regard Binocular Y [px]': '-214.0377',
        'Stimulus': 'wael-5-recording.avi',
        'AOI Name Binocular': '-',
      },
      {
        'RecordingTime [ms]': '2554883.9200',
        'Time of Day [h:m:s:ms]': '03:55:34:927',
        'Category Binocular': 'Visual Intake',
        'Index Binocular': '6',
        'Point of Regard Binocular X [px]': '590.3164',
        'Point of Regard Binocular Y [px]': '-212.6354',
        'Stimulus': 'wael-5-recording.avi',
        'AOI Name Binocular': '-',
      },
    ];

    let expectedRows = [
      {
        timestamp: '2554850.7630',
        timeOfDay: '03:55:34:894',
        category: 'Saccade',
        fixationIndex: '5',
        x: '592.7510',
        y: '-216.5275',
        stimulusName: 'wael-5-recording.avi',
        aoiName: '-'
      },
      {
        timestamp: '2554867.2940',
        timeOfDay: '03:55:34:910',
        category: 'Saccade',
        fixationIndex: '5',
        x: '589.2836',
        y: '-214.0377',
        stimulusName: 'wael-5-recording.avi',
        aoiName: '-'
      },
      {
        timestamp: '2554883.9200',
        timeOfDay: '03:55:34:927',
        category: 'Visual Intake',
        fixationIndex: '6',
        x: '590.3164',
        y: '-212.6354',
        stimulusName: 'wael-5-recording.avi',
        aoiName: '-'
      }
    ];

    expect(datafile.renameHeaders(rows)).to.eql(expectedRows);
  });

  it('renames imotions headers', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      {
        'Timestamp': '597',
        'FixationSeq': '1',
        'GazeX': '506',
        'GazeY': '94',
        'StimulusName': 'smiGlasses',
        'GazeAOI': '',
      },
      {
        'Timestamp': '614',
        'FixationSeq': '1',
        'GazeX': '509',
        'GazeY': '93',
        'StimulusName': 'smiGlasses',
        'GazeAOI': '',
      },
      {
        'Timestamp': '630',
        'FixationSeq': '1',
        'GazeX': '508',
        'GazeY': '95',
        'StimulusName': 'smiGlasses',
        'GazeAOI': '',
      },
    ];

    let expectedRows = [
      {
        timestamp: '597',
        fixationIndex: '1',
        x: '506',
        y: '94',
        stimulusName: 'smiGlasses',
        aoiName: ''
      },
      {
        timestamp: '614',
        fixationIndex: '1',
        x: '509',
        y: '93',
        stimulusName: 'smiGlasses',
        aoiName: ''
      },
      {
        timestamp: '630',
        fixationIndex: '1',
        x: '508',
        y: '95',
        stimulusName: 'smiGlasses',
        aoiName: ''
      },
    ];

    expect(datafile.renameHeaders(rows)).to.eql(expectedRows);
  });
});
