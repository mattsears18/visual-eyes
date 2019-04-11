export default function gazepoints(which) {
  let gp = this.viewing().gazepoints.slice(this.startIndex, this.endIndex + 1);
  if(typeof(which) != 'undefined') {
    return gp.map((gazepoint) => { return gazepoint[which]; });
  } else {
    return gp;
  }
}
