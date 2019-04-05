require('./../../factories.test');

describe('Datafiles.getPoints()', () => {
  it('gets fixations', async () => {
    let study = Factory.create('study', { fixationsOnly: true });
    let datafile = Factory.create('smiDatafile', { studyId: study._id });
    chai.expect(await datafile.getPoints()).to.eql(await datafile.getFixations());
  });
});

describe('Datafiles.getPoints()', () => {
  it('gets gazepoints', async () => {
    let study = Factory.create('study', { fixationsOnly: false });
    let datafile = Factory.create('smiDatafile', { studyId: study._id });
    chai.expect(await datafile.getPoints()).to.eql(await datafile.getGazepoints());
  });
});
