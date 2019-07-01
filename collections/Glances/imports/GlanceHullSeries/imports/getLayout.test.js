import GazeHullSeries from '../GazeHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('GazeHullSeries.getLayout()', () => {
  it('has no stimulusfile', () => {
    const hullseries = new GazeHullSeries({
      gaze: Factory.create('gazeWithGazepoints', {
        stimulusId: Factory.create('stimulus', {
          stimulusfileId: '',
        })._id,
      }),
      period: 5000,
    });

    expect(() => {
      hullseries.getLayout();
    }).to.throw('noStimulusfile');
  });

  it('gets a layout', () => {
    const gaze = Factory.create('gazeWithGazepoints');
    gaze.datafileId = Factory.create('imotionsDatafile')._id;

    const hullseries = new GazeHullSeries({
      gaze,
      period: 5000,
    });

    const layout = hullseries.getLayout();
    expect(layout.height).to.equal(620);
  });

  it('inverts the y axis for an imotions datafile', () => {
    const gaze = Factory.create('gazeWithGazepoints');
    gaze.fileFormat = 'imotions';

    const hullseries = new GazeHullSeries({
      gaze,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[1]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[0]).to.be.gt(0);
  });

  it('does not invert the y axis for an smi datafile', () => {
    const gaze = Factory.create('gazeWithGazepoints');
    gaze.fileFormat = 'smi';

    const hullseries = new GazeHullSeries({
      gaze,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[0]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[1]).to.be.gt(0);
  });
});
