import ViewingHullSeries from '../ViewingHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('ViewingHullSeries.getLayout()', () => {
  it('has no stimulusfile', () => {
    const hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewingWithGazepoints', {
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
    const viewing = Factory.create('viewingWithGazepoints');
    viewing.datafileId = Factory.create('imotionsDatafile')._id;

    const hullseries = new ViewingHullSeries({
      viewing,
      period: 5000,
    });

    const layout = hullseries.getLayout();
    expect(layout.height).to.equal(620);
  });

  it('inverts the y axis for an imotions datafile', () => {
    const viewing = Factory.create('viewingWithGazepoints');
    viewing.fileFormat = 'imotions';

    const hullseries = new ViewingHullSeries({
      viewing,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[1]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[0]).to.be.gt(0);
  });

  it('does not invert the y axis for an smi datafile', () => {
    const viewing = Factory.create('viewingWithGazepoints');
    viewing.fileFormat = 'smi';

    const hullseries = new ViewingHullSeries({
      viewing,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[0]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[1]).to.be.gt(0);
  });
});
