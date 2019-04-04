import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

describe('Datafiles.getNumericPositiveCoordinatesOnly()', () => {
  beforeEach(() => {
    StubCollections.stub([Datafiles.collection, Studies]);
    resetDatabase();
  });
  afterEach(() => {
    StubCollections.restore();
  });

  it('removes negative coordinate values', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-1', y: '500'},
      { x: '100', y: '-1'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes blanks', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '', y: '500'},
      { x: '100', y: ''},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });

  it('removes dashes', () => {
    let datafile = Factory.create('imotionsDatafile');
    let rows = [
      { x: '100', y: '500'},
      { x: '-', y: '500'},
      { x: '100', y: '-'},
    ];
    let expectedRows = [
      { x: '100', y: '500'},
    ];
    chai.expect(datafile.getNumericPositiveCoordinatesOnly(rows)).to.eql(expectedRows);
  });
});
