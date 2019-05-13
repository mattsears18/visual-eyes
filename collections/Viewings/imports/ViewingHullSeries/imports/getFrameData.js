export default function getFrameData(opt) {
  opt = opt || {};
  opt.hullIndex = opt.hullIndex || opt.index;
  const hull = this.getHull(opt);
  return this.getTraces({ hull });
}
