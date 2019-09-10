export default function getName() {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getName()');

  // return filename without file extension
  return this.name.replace(/\.[^/.]+$/, '');
}
