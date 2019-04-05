require('./../../factories.test');

describe('Datafiles.getPoints()', () => {
  it('gets fixations', async () => {
    let study = Factory.create('study', { fixationsOnly: true });
    let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    chai.expect(await datafile.getPoints()).to.eql(await datafile.getFixations());
  });

  it('gets gazepoints', async () => {
    let study = Factory.create('study', { fixationsOnly: false });
    let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
    chai.expect(await datafile.getPoints()).to.eql(await datafile.getGazepoints());
  });
});
