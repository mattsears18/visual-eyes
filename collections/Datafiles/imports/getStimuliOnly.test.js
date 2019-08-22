import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getStimuliOnly()', () => {
  it('returns empty array when passed empty array', () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [];
    expect(datafile.getStimuliOnly(rows)).to.eql(rows);
  });

  it("removes rows with stimulus name that contains '.avi'", () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { stimulusName: '.avi', x: 1 },
      { stimulusName: 'adsfegrhfb.avi', x: 2 },
      { stimulusName: 'dsfdgf.avisfdgfb', x: 3 },
      { stimulusName: '.aviadfsdgfh', x: 4 },
      { stimulusName: 'someName', x: 5 },
    ];

    const expectedRows = [{ stimulusName: 'someName', x: 5 }];
    expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });

  it("removes rows with stimulus name that contains 'smiGlasses'", () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { stimulusName: 'smiGlasses', x: 1 },
      { stimulusName: 'adsfegrhfbsmiGlasses', x: 2 },
      { stimulusName: 'dsfdgfsmiGlassessfdgfb', x: 3 },
      { stimulusName: 'smiGlassesadfsdgfh', x: 4 },
      { stimulusName: 'someName', x: 5 },
    ];

    const expectedRows = [{ stimulusName: 'someName', x: 5 }];
    expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });

  it('does not remove rows with blank or undefined stimulusName', () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      { x: 1 },
      { x: 2 },
      { stimulusName: '', x: 3 },
      { stimulusName: undefined, x: 4 },
      { stimulusName: 'someName', x: 5 },
      { stimulusName: null, x: 6 },
      { stimulusName: '-', x: 7 },
    ];

    const expectedRows = [
      { x: 1 },
      { x: 2 },
      { stimulusName: '', x: 3 },
      { stimulusName: undefined, x: 4 },
      { stimulusName: 'someName', x: 5 },
      { stimulusName: null, x: 6 },
      { stimulusName: '-', x: 7 },
    ];

    expect(datafile.getStimuliOnly(rows)).to.eql(expectedRows);
  });
});
