import PlotHull                 from '../PlotHull/PlotHull';

export default function hulls() {
  let hulls = [];
  let firstHullEndIndex = this.getEndGazepointIndex(0);
  let firstHull = new PlotHull(this.viewing(), 0, firstHullEndIndex);
  let endIndex;

  for(endIndex = (this.viewing().gazepoints.length - 1); endIndex > firstHullEndIndex; endIndex--) {
    let startIndex = this.getStartGazepointIndex(endIndex);
    let h = new PlotHull(this.viewing(), startIndex, endIndex);
    hulls.push(h);
  }

  hulls.push(firstHull);
  hulls = hulls.reverse();

  return hulls;
}
