export default function getStimuliOnly(renamedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getStimuliOnly()');

  return [...renamedRows].filter(
    row => row.stimulusName && !row.stimulusName.match(/\.avi|smiGlasses/),
  );
}
