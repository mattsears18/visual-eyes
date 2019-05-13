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
    const hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewingWithGazepoints'),
      period: 5000,
    });

    const layout = hullseries.getLayout();
    expect(layout.height).to.equal(620);
  });
});
