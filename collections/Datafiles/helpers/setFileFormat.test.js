require('./../../factories.test');

if(Meteor.isServer) {
  describe('Datafiles.setFileFormat()', () => {
    it('sets the imotions fileFormat', async () => {
      let datafile = Factory.create('imotionsDatafile');
      chai.expect(await datafile.setFileFormat()).to.equal('imotions');
      chai.expect(datafile.fileFormat).to.equal('imotions');
    });

    it('sets the smi fileFormat', async () => {
      let datafile = Factory.create('smiDatafile');
      chai.expect(await datafile.setFileFormat()).to.equal('smi');
      chai.expect(datafile.fileFormat).to.equal('smi');
    });

    it('is not a text file', async () => {
      let datafile = Factory.create('imotionsDatafile', { isText: false });
      chai.expect(await datafile.setFileFormat()).to.be.an('undefined');
      chai.expect(datafile.status).to.equal('unrecognizedFileFormat');
    });

    it('returns a previously saved fileFormat', async () => {
      let datafile = Factory.create('imotionsDatafile', { fileFormat: 'foo' });
      chai.expect(await datafile.fileFormat).to.equal('foo');
      chai.expect(await datafile.setFileFormat()).to.equal('foo');
    });
  });
}
