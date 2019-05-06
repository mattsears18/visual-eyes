require('../../../../factories.test');
const expect = require('chai').expect;
import ViewingHullSeries from '../ViewingHullSeries'

describe('ViewingHullSeries.getLayout()', () => {
  it('has no stimulusfile', () => {
    let hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewingWithGazepoints', {
        stimulusId: Factory.create('stimulus', {
          stimulusfileId: '',
        })._id,
      }),
      period: 5000,
    });

    expect(() => { hullseries.getLayout() }).to.throw('noStimulusfile')
  });

  it('gets a layout', () => {
    let hullseries = new ViewingHullSeries({
      viewing: Factory.create('viewingWithGazepoints'),
      period: 5000,
    });

    let layout = hullseries.getLayout();
    expect(layout.height).to.equal(620)
  })
});
