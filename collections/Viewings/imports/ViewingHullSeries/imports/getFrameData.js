export default function getFrameData(opt) {
  opt = opt || {}
  opt.hullIndex = opt.hullIndex || opt.index
  let hull = this.getHull(opt)
  return this.getTraces({ hull: hull })
}
