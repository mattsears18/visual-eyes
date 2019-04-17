export default function getCentroids({
  endIndex,
  which,
}) {
  let hulls = this.getHulls()
  if(typeof(endIndex) != 'undefined') { hulls = hulls.slice(0, endIndex + 1) }
  return hulls.map(h => h.centroid({ which: which }));
}
