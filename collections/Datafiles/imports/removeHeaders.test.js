import { Factory } from 'meteor/dburles:factory';

const fs = require('fs');
const os = require('os');

require('./../../factories.test');
const { expect } = require('chai');

describe('Datafiles.removeHeaders()', () => {
  it('removes headers from an imotions datafile', async () => {
    const datafile = Factory.create('imotionsDatafileWithHeaders');
    expect(datafile.headersRemoved).to.be.undefined;

    const filename = datafile.path.split('/').pop();
    const newPathFilename = `${os.tmpdir()}/${filename}`;

    if (Meteor.isDevelopment) {
      // copy the file so I don't change the test file
      fs.copyFileSync(datafile.path, newPathFilename);
      datafile.path = newPathFilename;
      datafile.versions.original.path = newPathFilename;
    }

    datafile.removeHeaders();
    expect(datafile.headersRemoved).to.equal(true);
    expect(datafile.fileFormat).to.equal('imotions');

    const rawData = await datafile.getRawData();

    if (Meteor.isDevelopment) {
      fs.unlinkSync(newPathFilename);
    }
  });

  it('removes headers from an smi datafile', () => {
    const datafile = Factory.create('smiDatafileWithHeaders');
    expect(datafile.headersRemoved).to.be.undefined;

    const filename = datafile.path.split('/').pop();
    const newPathFilename = `${os.tmpdir()}/${filename}`;

    if (Meteor.isDevelopment) {
      // copy the file so I don't change the test file
      fs.copyFileSync(datafile.path, newPathFilename);
      datafile.path = newPathFilename;
      datafile.versions.original.path = newPathFilename;
    }

    datafile.removeHeaders();
    expect(datafile.headersRemoved).to.equal(true);
    expect(datafile.fileFormat).to.equal('smi');

    if (Meteor.isDevelopment) {
      fs.unlinkSync(newPathFilename);
    }
  });
});
