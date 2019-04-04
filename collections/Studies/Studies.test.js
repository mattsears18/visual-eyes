import StubCollections from 'meteor/hwillson:stub-collections';
import Studies from './Studies';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
require('./../factories');


describe('Studies', () => {
  beforeEach(() => {
    StubCollections.stub(Studies);
    resetDatabase();
  });
  afterEach(() => {
    StubCollections.restore();
  });
});
