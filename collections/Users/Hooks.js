Meteor.users.after.insert(function (userId, user) {
  Roles.addUsersToRoles(user._id, 'create', 'generics');
});
