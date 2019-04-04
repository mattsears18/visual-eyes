import StubCollections from 'meteor/hwillson:stub-collections';
import Studies from './Studies';

describe('Studies', () => {
  beforeEach(() => {
    StubCollections.stub(Studies);
  });
  afterEach(() => {
    StubCollections.restore();
  });
});
