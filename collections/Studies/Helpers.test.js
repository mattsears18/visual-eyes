// if(Meteor.isServer) {
  describe('foo is 5', function () {
    foo = 5;

    it('foo equals 5', function () {
      chai.expect(foo).to.equal(5);
    });

    it('foo does not equal 17', function () {
      chai.expect(foo).to.not.equal(17);
    });
  });
// }
