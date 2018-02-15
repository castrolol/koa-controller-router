import { expect } from "chai";
import { RouteBag } from "../src/route-bag";

describe("Route Bag", () => {
  it("Should be init", () => {
    const routeBag = new RouteBag();

    expect(routeBag).to.be.instanceOf(RouteBag);
  });

  it("Should add actions", () => {
    const routeBag = new RouteBag();

    const action = {
      action: () => {},
      controller: {},
      path: ":id",
      method: "POST"
    };

    const routeId = routeBag.addAction(action);

    expect(routeBag.routes).to.deep.equals([{ ...action, id: routeId }]);
  });
 
});
