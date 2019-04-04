require('./../../factories.test');

describe('Datafiles.getStimuliOnly()', () => {
  it('removes rows with stimulus name that contains \'.avi\'', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { stimulusName: '.avi', x: 1, },
      { stimulusName: 'adsfegrhfb.avi', x: 2, },
      { stimulusName: 'dsfdgf.avisfdgfb', x: 3, },
      { stimulusName: '.aviadfsdgfh', x: 4, },
      { stimulusName: 'someName', x: 5, },
    ];

    let expectedRows = [
      { stimulusName: 'someName', x: 5, },
    ];
    chai.expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });

  it('removes rows with stimulus name that contains \'smiGlasses\'', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { stimulusName: 'smiGlasses', x: 1, },
      { stimulusName: 'adsfegrhfbsmiGlasses', x: 2, },
      { stimulusName: 'dsfdgfsmiGlassessfdgfb', x: 3, },
      { stimulusName: 'smiGlassesadfsdgfh', x: 4, },
      { stimulusName: 'someName', x: 5, },
    ];

    let expectedRows = [
      { stimulusName: 'someName', x: 5, },
    ];
    chai.expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });

  it('removes rows with blank or undefined stimulusName', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: 1, },
      { x: 2, },
      { stimulusName: '', x: 3, },
      { stimulusName: undefined, x: 4, },
      { stimulusName: 'someName', x: 5, },
    ];

    let expectedRows = [
      { stimulusName: 'someName', x: 5, },
    ];
    chai.expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });
});
