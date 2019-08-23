export default function getStimuliOnly(data) {
  return [...data].filter(
    row => row.stimulusName && !row.stimulusName.match(/\.avi|smiGlasses/),
  );
}
