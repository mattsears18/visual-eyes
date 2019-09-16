import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Datafiles.getAssignedRows()', () => {
  it("doesn't pass rawData", () => {
    const datafile = Factory.create('imotionsDatafile');
    expect(() => {
      datafile.getAssignedRows();
    }).to.throw('noData');
  });

  // TODO need tests herr
});
