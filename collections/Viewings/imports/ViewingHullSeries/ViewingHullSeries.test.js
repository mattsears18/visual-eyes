require("../../../factories.test");
const expect = require("chai").expect;
import ViewingHullSeries from "./ViewingHullSeries";

describe("ViewingHullSeries", () => {
  it("has no points", () => {
    expect(() => {
      new ViewingHullSeries();
    }).to.throw("noPoints");
  });

  it("has no viewing", () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 }
    ];

    expect(() => {
      new ViewingHullSeries({ points: points, period: 5000 });
    }).to.throw("noViewing");
  });

  it("has a viewing with no points", () => {
    let viewing = Factory.create("viewing");
    expect(() => {
      new ViewingHullSeries({ viewing: viewing });
    }).to.throw("noPoints");
  });

  it("has a viewing with points", () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 }
    ];

    let viewing = Factory.create("viewing", { gazepoints: points });
    let hullseries = new ViewingHullSeries({ viewing: viewing, period: 5000 });

    expect(hullseries.points).to.eql([
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 }
    ]);
  });

  it("is a ViewingHullSeries", () => {
    let viewing = Factory.create("viewingWithGazepoints");
    let hullseries = new ViewingHullSeries({ viewing: viewing, period: 5000 });

    expect(hullseries.constructor.name).to.equal("ViewingHullSeries");
  });

  it("overrides the viewing points", () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 }
    ];

    let otherPoints = [
      { x: 700, y: 500, timestamp: 6000 },
      { x: 800, y: 400, timestamp: 7000 },
      { x: 900, y: 300, timestamp: 8000 },
      { x: 100, y: 200, timestamp: 9000 },
      { x: 200, y: 100, timestamp: 10000 }
    ];

    let viewing = Factory.create("viewing", { gazepoints: points });
    let hullseries = new ViewingHullSeries({
      viewing: viewing,
      period: 5000,
      points: otherPoints
    });

    expect(hullseries.points).to.eql([
      { x: 700, y: 500, timestamp: 6000 },
      { x: 800, y: 400, timestamp: 7000 },
      { x: 900, y: 300, timestamp: 8000 },
      { x: 100, y: 200, timestamp: 9000 },
      { x: 200, y: 100, timestamp: 10000 }
    ]);
  });
});
