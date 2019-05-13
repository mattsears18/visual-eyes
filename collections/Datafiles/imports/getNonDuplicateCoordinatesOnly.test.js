require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getNonDuplicateCoordinatesOnly()', () => {
  it('returns empty array when passed empty array', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [];
    expect(await datafile.getNonDuplicateCoordinatesOnly(rows)).to.eql(rows);
  });

  it('removes duplicate coordinates on the same stimulus', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '0',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '1',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '50', a: '2',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '3',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '4',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '5',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '6',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '7',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '8',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '9',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '10',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '11',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '12',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '13',
      },
    ];
    const expectedRows = [
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '0',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '50', a: '2',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '3',
      },
      {
        stimulusName: 'stimulus', x: '100', y: '100', a: '7',
      },
      {
        stimulusName: 'stimulus', x: '50', y: '50', a: '10',
      },
    ];
    expect(await datafile.getNonDuplicateCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('does not remove duplicate coordinates on different stimuli', async () => {
    const datafile = Factory.create('imotionsDatafile');
    const rows = [
      {
        stimulusName: 'stimulus1', x: '100', y: '100', a: '1',
      },
      {
        stimulusName: 'stimulus2', x: '100', y: '100', a: '2',
      },
      {
        stimulusName: 'stimulus3', x: '100', y: '100', a: '3',
      },
      {
        stimulusName: 'stimulus1', x: '50', y: '50', a: '4',
      },
      {
        stimulusName: 'stimulus2', x: '50', y: '50', a: '5',
      },
      {
        stimulusName: 'stimulus3', x: '50', y: '50', a: '6',
      },
      {
        stimulusName: 'stimulus3', x: '50', y: '50', a: '7',
      },
      {
        stimulusName: 'stimulus3', x: '50', y: '50', a: '8',
      },
    ];
    const expectedRows = [
      {
        stimulusName: 'stimulus1', x: '100', y: '100', a: '1',
      },
      {
        stimulusName: 'stimulus2', x: '100', y: '100', a: '2',
      },
      {
        stimulusName: 'stimulus3', x: '100', y: '100', a: '3',
      },
      {
        stimulusName: 'stimulus1', x: '50', y: '50', a: '4',
      },
      {
        stimulusName: 'stimulus2', x: '50', y: '50', a: '5',
      },
      {
        stimulusName: 'stimulus3', x: '50', y: '50', a: '6',
      },
    ];
    expect(await datafile.getNonDuplicateCoordinatesOnly(rows)).to.eql(expectedRows);
  });
});
