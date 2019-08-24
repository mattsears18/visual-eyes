export default function getStimuliOnly(renamedRows) {
  return [...renamedRows].filter(
    row => row.stimulusName && !row.stimulusName.match(/\.avi|smiGlasses/)
  );
}
