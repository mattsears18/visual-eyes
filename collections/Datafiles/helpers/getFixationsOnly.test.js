import StubCollections from 'meteor/hwillson:stub-collections';
import Datafiles from './../Datafiles';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../../factories');

describe('Datafiles.getFixationsOnly()', () => {
  beforeEach(() => {
    StubCollections.stub([Datafiles.collection, Studies]);
    resetDatabase();
  });
  afterEach(() => {
    StubCollections.restore();
  });
});
