import Places from './Places';

Places.helpers({
  hasPermission(action) {
    check(action, String);

    if(this.userPermissions) {
      userIds = this.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  address() {
    return helpers.address(this);
  },
  owner() {
    return Companies.findOne({_id: this.ownerId});
  },
});
