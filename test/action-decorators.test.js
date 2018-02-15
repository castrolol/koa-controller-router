import { expect } from "chai";
import { post, get, put, del, prefix } from "../src/decorators";
import routeBag from "../src/route-bag";

describe("@post", () => {
  it("Should add a route in routeBag", () => {
    routeBag.reset();

    class SomeController {
      @post("route")
      action() {}
    }

    const routes = routeBag.routes;

    expect(routes.length).to.equal(1);
    expect(routes[0].path).to.equal("route");
    expect(routes[0].method).to.equal("POST");
  });
});

describe("@get", () => {
  it("Should add a route in routeBag", () => {
    routeBag.reset();

    class SomeController {
      @get("route")
      action() {}
    }

    const routes = routeBag.routes;

    expect(routes.length).to.equal(1);
    expect(routes[0].path).to.equal("route");
    expect(routes[0].method).to.equal("GET");
  });
});

describe("@put", () => {
  it("Should add a route in routeBag", () => {
    routeBag.reset();

    class SomeController {
      @put("route")
      action() {}
    }

    const routes = routeBag.routes;

    expect(routes.length).to.equal(1);
    expect(routes[0].path).to.equal("route");
    expect(routes[0].method).to.equal("PUT");
  });
});

describe("@del", () => {
    it("Should add a route in routeBag", () => {
      routeBag.reset();
  
      class SomeController {
        @del("route")
        action() {}
      }
  
      const routes = routeBag.routes;
  
      expect(routes.length).to.equal(1);
      expect(routes[0].path).to.equal("route");
      expect(routes[0].method).to.equal("DELETE");
    });
  });
  