Meteor.users.after.insert(function (userId, user) {
  Roles.addUsersToRoles(user._id, 'create', 'generics');
  Roles.addUsersToRoles(user._id, 'create', 'studies');
});
