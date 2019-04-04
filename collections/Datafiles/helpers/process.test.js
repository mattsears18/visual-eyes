import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');


describe('Datafiles.getRawCSV()', () => {
  beforeEach(() => {
    resetDatabase();
  });

  it('has 12,271 rows of raw data', async () => {
    let imotionsDatafile = Factory.create('imotionsDatafile');
    chai.expect((await imotionsDatafile.getRawCSV()).length).to.equal(12271);
  });

  it('has 12,742 rows of raw data', async () => {
    let smiDatafile = Factory.create('smiDatafile');
    chai.expect((await smiDatafile.getRawCSV()).length).to.equal(12742);
  });
});


describe('Datafiles.renameHeaders()', () => {});
describe('Datafiles.getRenamedRows()', () => {});
describe('Datafiles.getNumericPositiveCoordinatesOnly()', () => {});
describe('Datafiles.getVisualIntakesOnly()', () => {});
describe('Datafiles.getStimuliOnly()', () => {});
describe('Datafiles.getNonDuplicateCoordinatesInly()', () => {});
describe('Datafiles.getGazepoints()', () => {});
describe('Datafiles.getFixationsOnly()', () => {});
describe('Datafiles.getFixations()', () => {});
describe('Datafiles.getPoints()', () => {});
describe('Datafiles.process()', () => {});
