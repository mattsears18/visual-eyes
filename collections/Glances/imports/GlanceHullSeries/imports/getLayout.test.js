import GlanceHullSeries from '../GlanceHullSeries';

require('../../../../factories.test');
const { expect } = require('chai');

describe('GlanceHullSeries.getLayout()', () => {
  it('has no stimulusfile', () => {
    const hullseries = new GlanceHullSeries({
      glance: Factory.create('glanceWithGazepoints', {
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
    const glance = Factory.create('glanceWithGazepoints');
    glance.datafileId = Factory.create('imotionsDatafile')._id;

    const hullseries = new GlanceHullSeries({
      glance,
      period: 5000,
    });

    const layout = hullseries.getLayout();
    expect(layout.height).to.equal(620);
  });

  it('inverts the y axis for an imotions datafile', () => {
    const glance = Factory.create('glanceWithGazepoints');
    glance.fileFormat = 'imotions';

    const hullseries = new GlanceHullSeries({
      glance,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[1]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[0]).to.be.gt(0);
  });

  it('does not invert the y axis for an smi datafile', () => {
    const glance = Factory.create('glanceWithGazepoints');
    glance.fileFormat = 'smi';

    const hullseries = new GlanceHullSeries({
      glance,
      period: 5000,
    });

    expect(hullseries.getLayout().yaxis.range[0]).to.equal(0);
    expect(hullseries.getLayout().yaxis.range[1]).to.be.gt(0);
  });
});
