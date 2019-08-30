export default function getFrameData(opts) {
  opts = opts || {};
  opts.hullIndex = opts.hullIndex || opts.index;
  const hull = this.getHull(opts);
  return this.getTraces({ hull });
}
