export default function getStimuliOnly(data) {
  // remove any rows with ".avi" or "smiGlasses" in stimulusName
  return data.filter((row) => {
    if(row.stimulusName.match(/\.avi|smiGlasses/)) {
      return false;
    } else {
      return true;
    }
  });
}
